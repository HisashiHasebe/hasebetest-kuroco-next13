async function getData(slug:string) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/rcms-api/1/newsdetail/${slug}`);
  return res.json()
}

export default async function Page(props:{params: {slug: string}}) {
  const data = await getData(props.params.slug)
  console.log(props);

  return (
    <div>
      <h1>{data.details.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
    </div>
  );
}
