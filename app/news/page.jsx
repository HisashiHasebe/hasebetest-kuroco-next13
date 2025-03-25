'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ENV } from '../env';

export default function Page() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${ENV.NEXT_PUBLIC_BASE_URL}/rcms-api/1/news`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const newsData = await res.json();
        setData(newsData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found</p>;

  return (
    <div>
      <p>News list</p>
      {data.list.map((n) => (
        <div key={n.topics_id}>
          <Link href={`/news/${n.topics_id}`}>
            {n.ymd} {n.subject}
          </Link>
        </div>
      ))}
    </div>
  );
}
