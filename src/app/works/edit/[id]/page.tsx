"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Media } from '@/models/response/MediaListResponse';

export default function EditWorkPage({ params }: { params: { id: string } }) {
    const [work, setWork] = useState<Media | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedWorks = localStorage.getItem('works');
        if (storedWorks) {
            const works = JSON.parse(storedWorks);
            const currentWork = works.find((w: Media) => w.id === params.id);
            if (currentWork) {
                setWork(currentWork);
            } else {
                setError('Work not found');
            }
        } else {
            setError('No works data found. Please go back to the works list.');
        }
    }, [params.id]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!work) return;

        const token = localStorage.getItem('token');
        if (!token) {
            setError('No auth token found. Please log in.');
            return;
        }

        try {
            const response = await fetch(`https://wp-api.gluttongk.com/api/creator/modifyWork`, {
                method: 'PUT',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mediaId: work.id,
                    title: work.title,
                    describe: work.describe
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Work updated successfully');
                    router.push('/works');
                } else {
                    setError(data.message || 'Failed to update work.ts');
                }
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to update work.ts');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!work) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Edit Work</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Original Work Details:</h2>
                <p><strong>Title:</strong> {work.title}</p>
                <p><strong>Description:</strong> {work.describe}</p>
                {work.original_url && (
                    <img
                        src={work.original_url}
                        alt={work.title || 'Unknown'}
                        className="mt-4 max-w-[50%] h-auto"
                    />
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={work.title || ''}
                        onChange={(e) => setWork({ ...work, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="describe" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="describe"
                        name="describe"
                        value={work.describe || ''}
                        onChange={(e) => setWork({ ...work, describe: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows={3}
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update Work
                </button>
            </form>
        </div>
    );
}
