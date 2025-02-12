import React from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
    return (
        <div className={`typewriter ${className}`}>
            <style jsx>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }
            `}</style>
            {text}
        </div>
    );
}
