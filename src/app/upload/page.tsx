"use client"

import { useState } from 'react';
import { type PutBlobResult } from '@vercel/blob';
import {upload} from "@vercel/blob/client";

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [describe, setDescribe] = useState<string>('');
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            if (selectedFile.size > 4 * 1024 * 1024) {
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
            } else {
                console.log('uploading small file');
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('title', title);

                const response = await fetch('https://wp-api.gluttongk.com/api/creator/uploadWork', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                if (response.ok) {
                    alert('File uploaded successfully');
                } else {
                    alert('File uploadWork failed');
                }
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Upload an Image</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            required
                        />
                        {preview && (
                            <div className="mt-4 max-h-600 max-w-300">
                                <img src={preview} alt="Preview" className="w-full h-auto max-h-600 max-w-300"/>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                            required
                        />
                        <div className="flex items-baseline justify-between">
                            <button
                                type="submit"
                                className={`px-6 py-2 mt-4 text-white rounded-lg ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-900'}`}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
