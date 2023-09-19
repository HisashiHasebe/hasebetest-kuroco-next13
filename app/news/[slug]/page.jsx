async function getData(slug) {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/rcms-api/1/newsdetail/${slug}`);
  return res.json()
}

export default async function Page(props) {
  const data = await getData(props.params.slug)

  return (
    <div>
      <h1>{data.details.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.details.contents }} />
    </div>
  );
}
