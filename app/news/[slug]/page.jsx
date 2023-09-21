// Dynamic routes; create a page for each ticket ID
export async function generateStaticParams() {
    const contents = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news').then((res) => res.json())
    return contents.list.map((content) => ({
        slug: `${content.topics_id}`,
    }))
}

async function getData(slug) {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/rcms-api/1/newsdetail/${slug}`, { cache: 'no-store' });
    return res.json()
}

export default async function Page(params) {
    const data = await getData(params.slug)

    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    );
}
