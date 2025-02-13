'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/Header'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [content, setContent] = useState<string>('')
    const [describe, setDescribe] = useState<string>('')
    const [blob, setBlob] = useState<PutBlobResult | null>(null)
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const t = useTranslations('upload')

    useEffect(() => {
        // Check for authentication when component mounts
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/')
        }
    }, [router])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)

            const imageUrl = URL.createObjectURL(file)
            setPreviewUrl(imageUrl)

            // Only set title if it's empty
            if (!title.trim()) {
                // Remove file extension from name
                const fileName = file.name.replace(/\.[^/.]+$/, '')
                setTitle(fileName)
            }
        }
    }

    const handleSubmit = async () => {
        if (!selectedFile) return

        setIsUploading(true)

        const token = localStorage.getItem('token')
        if (!token) {
            alert(t('loginFirst'))
            setIsUploading(false)
            return
        }

        try {
            const newBlob = await upload(selectedFile.name, selectedFile, {
                access: 'public',
                handleUploadUrl: '/api/uploadWork',
                clientPayload: JSON.stringify({
                    token,
                    title,
                }),
            })

            setBlob(newBlob)
            alert(t('uploadSuccess'))
        } catch (err) {
            console.error('Upload error:', err)
            alert(t('uploadFailed'))
        } finally {
            setIsUploading(false)
        }
    }

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
        <div className='flex min-h-screen flex-col'>
            <Header />
            <div className='flex flex-1 items-center justify-center bg-gray-100'>
                <Card className='w-[450px]'>
                    <CardHeader>
                        <CardTitle>{t('pageTitle')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='grid w-full items-center gap-4'>
                            <Label htmlFor='image-title'>
                                {t('imageTitle')}
                            </Label>
                            <Input
                                id='image-title'
                                type='text'
                                placeholder={t('imageTitlePlaceholder')}
                                value={title}
                                onChange={handleTitleChange}
                            />
                            <Label htmlFor='picture'>{t('selectImage')}</Label>
                            <Input
                                id='picture'
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                            />
                            {previewUrl && (
                                <div className='mt-4'>
                                    <img
                                        src={previewUrl}
                                        alt='preview'
                                        className='max-h-60 max-w-fit rounded-lg'
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedFile || isUploading}
                            className='w-full'
                        >
                            {isUploading ? t('uploading') : t('uploadButton')}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
