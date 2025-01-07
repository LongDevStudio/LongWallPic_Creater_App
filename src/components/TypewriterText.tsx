import React from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
    return (
        <div className={`typewriter ${className}`}>
            <style jsx>{`
                .typewriter {
                    position: relative;
                    width: fit-content;
                    margin: 0 auto;
                }
                
                //.typewriter::after {
                //    content: '|';
                //    position: absolute;
                //    right: -2px;
                //    animation: blink 1s infinite;
                //    z-index: 1;
                //}
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }
                
                .typewriter {
                    overflow: hidden;
                    white-space: nowrap;
                    animation: typing 3.5s steps(40, end);
                }
            `}</style>
            {text}
        </div>
    );
}
