import { NextResponse } from 'next/server';

// Upstash Redis REST API - no npm package needed!
// Set these in your .env.local file:
//   UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
//   UPSTASH_REDIS_REST_TOKEN=your-token-here
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const COUNTER_KEY = 'jcarl:portfolio:views';

async function upstashCommand(command: string[]): Promise<any> {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) {
        throw new Error('Upstash credentials not configured');
    }

    const response = await fetch(`${UPSTASH_URL}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${UPSTASH_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
    });

    if (!response.ok) {
        throw new Error(`Upstash error: ${response.status}`);
    }

    return response.json();
}

// GET: Return current view count
export async function GET() {
    try {
        const data = await upstashCommand(['GET', COUNTER_KEY]);
        const count = parseInt(data.result, 10) || 0;
        return NextResponse.json({ count });
    } catch (error) {
        console.error('View counter GET error:', error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}

// POST: Increment and return new view count
export async function POST() {
    try {
        const data = await upstashCommand(['INCR', COUNTER_KEY]);
        const count = data.result;
        return NextResponse.json({ count });
    } catch (error) {
        console.error('View counter POST error:', error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
