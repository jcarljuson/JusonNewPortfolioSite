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
                // Using a fallback key if domain is not yet registered, but usually it auto-creates.
                // We'll use 'jcarl.us' as the namespace.
                const response = await fetch('https://api.countapi.xyz/hit/jcarl.us/visits');
                const data = await response.json();
                setViews(data.value);
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
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
            <Eye className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-colors" />
            <span className="text-xs font-medium text-secondary group-hover:text-primary tabular-nums transition-colors">
                {views.toLocaleString()}
            </span>
        </div>
    );
}
