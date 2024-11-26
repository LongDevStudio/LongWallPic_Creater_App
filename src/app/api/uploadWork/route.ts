export const maxDuration = 60; // This function can run for a maximum of 5 seconds

import {handleUpload, type HandleUploadBody} from '@vercel/blob/client';
import {NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';
import {sql} from "@vercel/postgres";
import {createClient} from '@sanity/client';
import {v4 as uuidv4} from 'uuid';

interface DecodedToken {
    userId: string;
}

const sanityClient = createClient({
    projectId: process.env.SANITY_API_PROJECT_ID,
    dataset: process.env.SANITY_DATA_SET,
    apiVersion: '2021-03-25', // Use the latest version
    token: process.env.SANITY_RW_TOKEN,
    useCdn: false // Set to false to always get the latest data
});

// Use-case: uploading images for blog posts
export async function POST(request: Request): Promise<NextResponse> {
    const body = (await request.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname, clientPayload) => {
                // Generate a client token for the browser to uploadWork the file
                // ⚠️ Authenticate and authorize users before generating the token.
                // Otherwise, you're allowing anonymous uploads.

                // ⚠️ When using the clientPayload feature, make sure to valide it
                // otherwise this could introduce security issues for your app
                // like allowing users to modify other users' posts

                if (!clientPayload) {
                    return {
                        error: 'Unauthorized',
                    }
                }

                const {token, title} = JSON.parse(clientPayload);
                if (!token || !title) {
                    return {
                        error: 'Unauthorized',
                    }
                }


                let decoded: DecodedToken;
                try {
                    decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
                } catch (error) {
                    console.log(`Invalid token: ${error}`);
                    throw new Error('Invalid token');
                }

                const query = `
                    SELECT *
                    FROM users
                    WHERE id = $1
                      AND is_creator = true
                `;
                const result = await sql.query(query, [decoded.userId]);
                if (result.rows.length === 0) {
                    console.log(' user {} is not a creator', decoded.userId);
                    throw new Error('User is not a creator');
                }

                const creatorDoc = await getCreatorDocByUserId(decoded.userId);
                if (!creatorDoc) {
                    console.log(' user {} is not a creator', decoded.userId);
                    throw new Error('Creator not found, please connect to admin!');
                }

                return {
                    allowedContentTypes: [
                        'image/jpeg',
                        'image/png',
                        'image/gif',
                        'image/webp',
                    ], // optional, default to all content type
                    tokenPayload: JSON.stringify({
                        userId: decoded.userId,
                        creatorDocId: creatorDoc?._id,
                    })
                };
            },
            onUploadCompleted: async ({blob, tokenPayload}) => {
                // Get notified of client uploadWork completion
                // ⚠️ This will not work on `localhost` websites,
                // Use ngrok or similar to get the full uploadWork flow

                console.log('blob uploadWork completed', blob, tokenPayload);

                const response = await fetch(blob.url);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                console.log(`buffer size: ${buffer.byteLength}`);

                const fileName = blob.pathname.split('/').pop() || ''

                try {
                    console.log('Starting to upload image asset to Sanity...');
                    console.log('Sanity config:', {
                        projectId: process.env.SANITY_API_PROJECT_ID,
                        dataset: process.env.SANITY_DATA_SET
                    });
                    
                    const asset = await sanityClient.assets.upload('image', buffer, {
                        filename: 'image.jpg',
                    });
                    console.log('Image asset uploaded to Sanity successfully:', {
                        assetId: asset._id,
                        size: asset.size,
                        mimeType: asset.mimeType
                    });

                    console.log('Starting to upload original file to Sanity...');
                    const originFile = await sanityClient.assets.upload('file', buffer, {
                        filename: 'image.jpg',
                    });
                    console.log('Original file uploaded to Sanity successfully:', {
                        fileId: originFile._id,
                        size: originFile.size,
                        mimeType: originFile.mimeType
                    });

                    const {userId, creatorDocId} = JSON.parse(tokenPayload!);


                    // fixme: 存在以下问题，偶尔出现
                    // 1. 上传了两次
                    // 2. 显示上传成功，但是 Sanity 里面没有文件

                    // Run any logic after the file uploadWork completed,
                    // If you've already validated the user and authorization prior, you can
                    // safely update your database

                    const upload_at = new Date().toISOString();
                    console.log(`start to create work file for user ${userId} at ${upload_at}`);

                    const workFileDoc = {
                        _type: 'work_file',
                        creator: {
                            _type: 'reference',
                            _ref: creatorDocId,
                        },
                        image: asset ? {
                            _type: 'image',
                            asset: {
                                _type: 'reference',
                                _ref: asset._id
                            }
                        } : {},
                        original_file: originFile ? {
                            _type: 'file',
                            asset: {
                                _type: 'reference',
                                _ref: originFile._id
                            }
                        } : {},
                        source: {},
                        file_name: fileName,
                        file_extension: '',
                        file_size: 0,
                        file_mime_type: '',
                        upload_at: upload_at,
                    }

                    const createdWorkDoc = await sanityClient.create(workFileDoc);
                    console.log('Work file {} created successfully', createdWorkDoc._id);

                    const workData = {
                        _type: 'work',
                        work_name: 'transfer',
                        description: '',
                        creator: {
                            _type: 'reference',
                            _ref: creatorDocId// Assuming userId corresponds to creator document ID
                        },
                        work_type: {
                            _type: 'work_type',
                            type: 0, // Default to static work file
                            is_third_part: false,
                            is_ai: false
                        },
                        cover_image: asset ? {
                            _type: 'image',
                            asset: {
                                _type: 'reference',
                                _ref: asset._id
                            }
                        } : {},
                        work_file: {
                            _type: 'reference',
                            _ref: createdWorkDoc._id
                        },
                        work_permission: {
                            _type: 'work_permission',
                            permission_type: 0 // Default to public
                        },
                        supported_devices: [{
                            _type: 'supported_devices',
                            _key: uuidv4(),
                            device_name: 1 // Default to mobile
                        }],
                        save_count: 0,
                        download_count: 0,
                        view_count: 0,
                        share_count: 0,
                        created_at: upload_at,
                        updated_at: upload_at
                    };

                    const createdWork = await sanityClient.create(workData);

                    if (creatorDocId) {
                        // Update total works count
                        const patch = sanityClient.patch(creatorDocId).inc({
                            total_works_count: 1
                        });

                        await patch.commit();
                    }

                    console.log('Work {} created successfully', createdWork._id);

                } catch (error) {
                    console.error('Error during Sanity upload:', {
                        error: error instanceof Error ? error.message : String(error),
                        stack: error instanceof Error ? error.stack : undefined,
                        timestamp: new Date().toISOString()
                    });
                    throw error;
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (error) {
        return NextResponse.json(
            {error: error instanceof Error ? error.message : String(error)},
            {status: 400}, // The webhook will retry 5 times waiting for a 200
        );
    }
}

const getCreatorDocByUserId = async (userId: number | string) => {
    const query = `*[_type == "creator" && user_id == $userId][0]{_id}`;
    const params = {userId};
    const result = await sanityClient.fetch(query, params);
    return result ? result : null;
};
