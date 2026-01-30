'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function ViewCounter() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // Namespace: jcarl.us, Key: visits
        // Using countapi.xyz or similar free counter service
        // Creating a unique key for the user's domain
        const fetchViews = async () => {
            try {
                // "hit" endpoint increments and returns the new value
                // Using counterapi.dev as a reliable alternative
                const response = await fetch('https://api.counterapi.dev/v1/jcarl.us/visits/up');
                const data = await response.json();
                setViews(data.count); // counterapi.dev returns 'count', not 'value'
            } catch (error) {
                console.error('Error fetching view count:', error);
                // Fallback to a static number or null if offline/blocked
                setViews(null);
            }
        };

        fetchViews();
    }, []);

    if (views === null) return null; // Hide if loading or error

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default group backdrop-blur-md">
            <Eye className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            <div className="flex items-center text-xs font-medium text-secondary group-hover:text-primary transition-colors">
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 whitespace-nowrap">
                    Total Views:&nbsp;
                </span>
                <span className="tabular-nums">
                    {views.toLocaleString()}
                </span>
            </div>
        </div>
    );
}
