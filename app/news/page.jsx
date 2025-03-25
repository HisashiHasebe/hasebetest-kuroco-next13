'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ENV } from '../env';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        console.log(`Fetching news list: ${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/news`);
        
        const res = await fetch(`${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/news`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status}`);
        }
        
        const newsData = await res.json();
        setData(newsData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching news list:', err);
        setError(err.message);
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Handle news item click with client-side navigation
  const handleNewsClick = (e, id) => {
    e.preventDefault();
    router.push(`/news/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div>
      <p>News list</p>
      {data.list.map((n) => (
        <div key={n.topics_id}>
          <a href={`/news/${n.topics_id}`} onClick={(e) => handleNewsClick(e, n.topics_id)}>
            {n.ymd} {n.subject}
          </a>
        </div>
      ))}
    </div>
  );
}
