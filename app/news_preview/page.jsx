'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = searchParams.get('preview_token')
    const fetchData = async () => {
      try {
        const res = await fetch('/api/preview/?preview_token=' + token).then((res) => res.json());
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // 空の依存配列を渡すと、初回レンダリング時のみ実行されます

  //dataの取得完了までLoadingを表示する
  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.details.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
    </div>
  );
}
