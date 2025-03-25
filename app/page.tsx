import Link from 'next/link';

export default function Home() {
  return (
    <div><h1>Next.js 13 のアップルータで作ったサイトトップ</h1>
      <Link href={'/news/'}>news</Link>
    </div>
  )
}
