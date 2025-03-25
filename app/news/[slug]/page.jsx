'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ENV } from '../../env';

// Keep generateStaticParams for static generation of known routes
export async function generateStaticParams() {
    const contents = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news').then((res) => res.json());
    return contents.list.map((content) => ({
        slug: `${content.topics_id}`,
    }));
}

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            if (!params?.slug) return;
            
            try {
                setIsLoading(true);
                console.log(`Fetching news detail: ${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/newsdetail/${params.slug}`);
                
                const res = await fetch(`${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/newsdetail/${params.slug}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch data: ${res.status}`);
                }
                
                const newsData = await res.json();
                setData(newsData);
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching news detail:', err);
                setError(err.message);
                setIsLoading(false);
            }
        }
        
        fetchData();
    }, [params?.slug]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>No data found</p>;

    return (
        <div>
            <h1>{data.details.subject}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
            <div style={{ marginTop: '20px' }}>
                <Link href="/news">Back to News List</Link>
            </div>
        </div>
    );
}
