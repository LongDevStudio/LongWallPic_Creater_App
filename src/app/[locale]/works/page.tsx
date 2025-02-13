'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MediaListResponse } from '@/models/response/MediaListResponse'
import { Header } from '@/components/Header'

export default function WorksPage() {
    const [works, setWorks] = useState<MediaListResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const router = useRouter()

    const fetchWorks = async (forceRefresh = false) => {
        setIsRefreshing(true)
        const token = localStorage.getItem('token')
        if (!token) {
            setError('No auth token found. Please log in.')
            setIsRefreshing(false)
            return
        }

        setIsRefreshing(false)
    }

    const handleDelete = async (workId: string) => {
        const token = localStorage.getItem('token')
        if (!token) {
            alert('No auth token found. Please log in.')
            return
        }

        try {
            const response = await fetch(
                `https://wp-api.gluttongk.com/api/creator/updateWork/`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ is_delete: true, workId: workId }),
                }
            )

            if (response.ok) {
                alert('Work deleted successfully')
                fetchWorks(true) // Refresh the works list
            } else {
                alert('Failed to delete work.ts')
            }
        } catch (err) {
            alert('An error occurred. Please try again.')
        }
    }

    useEffect(() => {
        // Check for authentication when component mounts
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/')
        }
    }, [router])

    useEffect(() => {
        fetchWorks()
    }, [])

    if (error) {
        return <p className='text-red-500'>{error}</p>
    }

    return (
        <div className='flex min-h-screen flex-col'>
            <Header />
            <div className='flex-1 bg-gray-100 p-8'>
                <div className='mx-auto max-w-7xl'>
                    <div className='mb-6 flex items-center justify-between'>
                        <h1 className='text-2xl font-bold'>My Works</h1>
                        <button
                            onClick={() => fetchWorks(true)}
                            className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                            disabled={isRefreshing}
                        >
                            {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>
                    {isRefreshing && <p>Loading...</p>}
                    {works && works.media && (
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                            {works.media.map(work => (
                                <div
                                    key={work.id}
                                    className='overflow-hidden rounded-lg bg-white shadow-md'
                                >
                                    <img
                                        src={work.original_url}
                                        alt={work.title || 'Untitled'}
                                        className='h-48 w-full object-cover'
                                    />
                                    <div className='p-4'>
                                        <h3 className='mb-2 text-lg font-semibold'>
                                            {work.title || 'Untitled'}
                                        </h3>
                                        <div className='flex items-center justify-between'>
                                            <button
                                                onClick={() =>
                                                    handleDelete(work.id)
                                                }
                                                className='text-red-600 hover:text-red-800'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!works?.media?.length && !isRefreshing && (
                        <p className='text-gray-500'>No works found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
