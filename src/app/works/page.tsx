"use client"

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {MediaListResponse} from '@/models/response/MediaListResponse';
import {GenericResponse} from '@/models/response/GenericResponse';
import Link from 'next/link';

export default function WorksPage() {
    const [works, setWorks] = useState<MediaListResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const router = useRouter();

    const fetchWorks = async (forceRefresh = false) => {
        setIsRefreshing(true);
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No auth token found. Please log in.');
            setIsRefreshing(false);
            return;
        }

        try {
            // Check for cached data if not forcing refresh
            if (!forceRefresh) {
                const cachedWorks = localStorage.getItem('works');
                if (cachedWorks) {
                    setWorks({
                        media: JSON.parse(cachedWorks),
                        pagination: {
                            currentPage: 1,
                            totalPages: 1,
                            totalItems: 0,
                            itemsPerPage: 10
                        }
                    });
                    setIsRefreshing(false);
                    return;
                }
            }

            const response = await fetch('https://wp-api.gluttongk.com/api/users/listWorks?limit=100&page=1', {
                headers: {
                    'Authorization': `${token}`
                }
            });

            if (response.ok) {
                const data: GenericResponse<MediaListResponse> = await response.json();
                if (data.success && data.data) {
                    setWorks(data.data);
                    localStorage.setItem('works', JSON.stringify(data.data.media));
                } else {
                    setError(data.message || 'Failed to fetch works');
                }
            } else {
                const data: GenericResponse<null> = await response.json();
                setError(data.message || 'Failed to fetch works');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
        setIsRefreshing(false);
    };

    const handleDelete = async (workId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No auth token found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`https://wp-api.gluttongk.com/api/creator/updateWork/`, {
                method: 'POST',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ is_delete: true, workId: workId })
            });

            if (response.ok) {
                alert('Work deleted successfully');
                fetchWorks(true); // Refresh the works list
            } else {
                alert('Failed to delete work.ts');
            }
        } catch (err) {
            alert('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        fetchWorks();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!works) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Your Works</h1>
                <button
                    onClick={() => fetchWorks(true)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isRefreshing}
                >
                    {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {works.media.map((work) => (
                    <div key={work.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                        <div className="h-48 bg-gray-900 flex items-center justify-center">
                            {work.original_url ? (
                                <img src={work.original_url} alt={work.title || 'Untitled'}
                                     className="h-full w-full object-cover"/>
                            ) : (
                                <span className="text-gray-400">
                                     <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                     </svg>
                                 </span>
                            )}
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                            <h2 className="text-xl text-black font-semibold mb-2">{work.title || 'Untitled'}</h2>
                            <p className="text-gray-600 mb-4 flex-grow">
                                {work.describe && work.describe.length > 250
                                    ? `${work.describe.substring(0, 250)}...`
                                    : work.describe || 'No description'}
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                                <span>{new Date(work.upload_date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                }).replace(/\//g, '/')}</span>
                                <span className="text-blue-600">Category</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <Link href={`/works/edit/${work.id}`}>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={() => handleDelete(work.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
