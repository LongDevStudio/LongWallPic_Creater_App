'use client'

import React, { useState } from 'react'

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedFile) return

        const formData = new FormData()
        formData.append('file', selectedFile)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                alert('File uploaded successfully')
            } else {
                alert('File uploadWork failed')
            }
        } catch (err) {
            alert('An error occurred. Please try again.')
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='mt-4 bg-white px-8 py-6 text-left shadow-lg'>
                <h3 className='text-center text-2xl font-bold'>
                    Upload an Image
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            className='mt-2 w-full rounded-md border px-4 py-2 focus:ring-1 focus:ring-blue-600 focus:outline-hidden'
                            required
                        />
                        {preview && (
                            <div className='mt-4'>
                                <img
                                    src={preview}
                                    alt='Preview'
                                    className='h-auto w-full'
                                />
                            </div>
                        )}
                        <div className='flex items-baseline justify-between'>
                            <button className='mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-900'>
                                Upload
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
