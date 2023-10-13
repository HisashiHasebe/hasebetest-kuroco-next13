'use client'

import { useEffect, useState } from 'react';

export default function Page(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // このコードブロックは初回レンダリング時にのみ実行されます
    const fetchData = async () => {
      try {
        const res = await fetch('/api/preview/?preview_token=' + props.searchParams.preview_token).then((res) => res.json());
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

