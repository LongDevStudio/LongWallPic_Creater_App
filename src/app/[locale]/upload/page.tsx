"use client"

import {ChangeEvent, useEffect, useState} from 'react';
import {type PutBlobResult} from '@vercel/blob';
import {upload} from "@vercel/blob/client";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Header} from "@/components/Header";

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [content, setContent] = useState<string>('');
    const [describe, setDescribe] = useState<string>('');
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            const imageUrl = URL.createObjectURL(file)
            setPreviewUrl(imageUrl)

            // Only set title if it's empty
            if (!title.trim()) {
                // Remove file extension from name
                const fileName = file.name.replace(/\.[^/.]+$/, "");
                setTitle(fileName);
            }
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', title);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login first');
            setIsUploading(false);
            return;
        }

        try {

            console.log('uploading large file');
            const newBlob = await upload(selectedFile.name, selectedFile, {
                access: 'public',
                handleUploadUrl: '/api/uploadWork',
                clientPayload: JSON.stringify({
                    token,
                    title,
                })
            });

            setBlob(newBlob);
            alert('File uploaded successfully');
            // if (selectedFile.size > 4 * 1024 * 1024) {
            //     console.log('uploading large file');
            //     const newBlob = await upload(selectedFile.name, selectedFile, {
            //         access: 'public',
            //         handleUploadUrl: '/api/uploadWork',
            //         clientPayload: JSON.stringify({
            //             token,
            //             title,
            //         })
            //     });

            //     setBlob(newBlob);
            //     alert('File uploaded successfully');
            // } else {
            //     console.log('uploading small file');
            //     const formData = new FormData();
            //     formData.append('file', selectedFile);
            //     formData.append('title', title);

            //     const response = await fetch('https://wp-api.gluttongk.com/api/creator/uploadWork', {
            //         method: 'POST',
            //         body: formData,
            //         headers: {
            //             'Authorization': `${token}`
            //         }
            //     });

            //     if (response.ok) {
            //         alert('File uploaded successfully');
            //         console.log('Uploading:', {file: selectedFile, title: title})
            //         // 重置表单
            //         setSelectedFile(null)
            //         setPreviewUrl(null)
            //         setTitle('')

            //     } else {
            //         alert('File uploadWork failed');
            //     }
            // }
        } catch (err) {
            console.error('Upload error:', err);
            alert('File upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 bg-gray-100 flex items-center justify-center">
                <Card className="w-[450px]">
                    <CardHeader>
                        <CardTitle>Upload Your Work</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <Label htmlFor="image-title">图片标题</Label>
                            <Input
                                id="image-title"
                                type="text"
                                placeholder="请输入图片标题"
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <Label htmlFor="picture">选择图片</Label>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {previewUrl && (
                                <div className="mt-4">
                                    <img
                                        src={previewUrl}
                                        alt="预览"
                                        className="max-w-fit max-h-60 rounded-lg"
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedFile || isUploading}
                            className="w-full"
                        >
                            {isUploading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
