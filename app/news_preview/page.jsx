"use client"

async function getData(preview_token) {
  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news/preview');
  url.searchParams.append('preview_token', preview_token);
  const res = await fetch(url);
  return res.json()
}

export default async function Page(props) {
  const data = await getData(props.searchParams.preview_token)

  return (
    <div>
      <h1>{data.details.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
    </div>
  );
}