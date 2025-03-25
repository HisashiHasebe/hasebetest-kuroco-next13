// app/news/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const { slug } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/newsdetail/${slug}`)
      .then((res) => res.json())
      .then(setData);
  }, [slug]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.details.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
    </div>
  );
}
