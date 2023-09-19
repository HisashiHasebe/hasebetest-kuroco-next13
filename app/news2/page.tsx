"use client"
import React, { useState, useEffect } from 'react'; // 必要なインポートを追加
import Link from 'next/link';

function getData() {
  return fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news').then((res) => res.json());
}

const Page = () => {
  const [data, setData] = useState({ list: [] });

  useEffect(() => {
    getData().then((responseData) => {
      setData(responseData);
    });
  }, []);

  return (
    <div>
      <p>ニュース一覧ページ</p>
      {data.list.map((n: any) => (
        <div key={n.slug}>
          <Link href={`/news/${n.topics_id}`}>
            {n.ymd} {n.subject}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Page;
