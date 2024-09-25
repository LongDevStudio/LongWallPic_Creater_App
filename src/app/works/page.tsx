"use client"

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {MediaListResponse} from '@/models/response/MediaListResponse';
import {GenericResponse} from '@/models/response/GenericResponse';

export default function WorksPage() {
    const [works, setWorks] = useState<MediaListResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchWorks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No auth token found. Please log in.');
                return;
            }

            try {
                const response = await fetch('https://wp-api.gluttongk.com/api/users/listWorks?limit=100&page=1', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                if (response.ok) {
                    const data: GenericResponse<MediaListResponse> = await response.json();
                    if (data.success && data.data) {
                        setWorks(data.data);
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
        };

        fetchWorks();
    }, []);

    if (error) {
        return (
            <p className="text-red-500">
                {error}
            </p>
        );
    }

    if (!works) {
        return (<p>Loading...</p>);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Your Works</h3>
                <ul className="mt-4">
                    {works.media.map((work) => (
                        <li key={work.id} className="mb-4">
                            <h4 className="text-xl font-semibold">{work.title || 'Untitled'}</h4>
                            <p>{work.describe || 'No description'}</p>
                            <p>Uploaded on: {new Date(work.upload_date).toLocaleDateString()}</p>
                            <a href={work.original_url} target="_blank" rel="noopener noreferrer"
                               className="text-blue-600">View</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
