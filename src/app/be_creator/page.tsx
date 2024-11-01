'use client'

import { useState, useRef } from 'react';

export default function BeCreator() {
    const [uuidParts, setUuidParts] = useState(['', '', '', '', '']);
    const [message, setMessage] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        const newParts = [...uuidParts];
        newParts[index] = value;
        setUuidParts(newParts);

        // Move to the next input if the current one is filled
        if (value.length === getMaxLength(index) && index < uuidParts.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const getMaxLength = (index: number) => {
        switch (index) {
            case 0:
                return 8;
            case 1:
                return 4;
            case 2:
                return 4;
            case 3:
                return 4;
            case 4:
                return 12;
            default:
                return 0;
        }
    };

    const handleSubmit = () => {
        const uuid = uuidParts.join('-');
        if (uuid) {
            setMessage(`UUID ${uuid} submitted for verification.`);
        } else {
            setMessage('Please enter a valid UUID.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-2xl mb-4">Become a Creator</h1>
            <h3 className="text-2xl mb-4">Enter the code below</h3>
            <div className="flex space-x-2">
                {uuidParts.map((part, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="text"
                            value={part}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={`Part ${index + 1}`}
                            className="border p-2 mb-4"
                            style={{ width: `${getMaxLength(index) * 30}px` }}
                            maxLength={getMaxLength(index)}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                        />
                        {index < uuidParts.length - 1 && <span className="mx-2">-</span>}
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background h-10 px-4"
            >
                Submit
            </button>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
