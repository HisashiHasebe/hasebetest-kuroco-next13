import Link from 'next/link';

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news');
  return res.json()
}

export default async function Page() {
  const data = await getData()
 
  return (
    <div>
      <p>News list</p>
      {data.list.map((n:any) => (
        <div key={n.slug}>
          <Link href={`/news/${n.topics_id}`}>
            {n.ymd} {n.subject}
          </Link>
        </div>
      ))}
    </div>
  );
}
