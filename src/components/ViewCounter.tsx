'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function ViewCounter() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        const fetchViews = async () => {
            // Strategy: Try self-hosted API first, then external fallback
            // 1. Try our own Next.js API route
            try {
                const response = await fetch('/api/views', { method: 'POST' });
                if (response.ok) {
                    const data = await response.json();
                    if (data.count && data.count > 0) {
                        setViews(data.count);
                        return;
                    }
                }
            } catch (e) {
                console.warn('Self-hosted counter unavailable:', e);
            }

            // 2. Fallback: Try counterapi.dev (may come back online)
            try {
                const response = await fetch('https://api.counterapi.dev/v1/jcarl.us/visits/up');
                if (response.ok) {
                    const data = await response.json();
                    if (data.count) {
                        setViews(data.count);
                        return;
                    }
                }
            } catch (e) {
                console.warn('counterapi.dev unavailable:', e);
            }

            // 3. Last resort: show a cached/localStorage count so it's not empty
            try {
                const cached = localStorage.getItem('jcarl_view_count');
                if (cached) {
                    const cachedCount = parseInt(cached, 10);
                    if (!isNaN(cachedCount) && cachedCount > 0) {
                        setViews(cachedCount);
                        return;
                    }
                }
            } catch (e) {
                // localStorage not available
            }

            // All failed — keep null (hidden)
            setViews(null);
        };

        fetchViews();
    }, []);

    // Cache successful counts for offline fallback
    useEffect(() => {
        if (views !== null && views > 0) {
            try {
                localStorage.setItem('jcarl_view_count', views.toString());
            } catch (e) {
                // localStorage not available
            }
        }
    }, [views]);

    if (views === null) return null; // Hide if all APIs failed

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
