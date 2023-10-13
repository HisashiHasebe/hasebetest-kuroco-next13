//export const dynamic = 'force-static'
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('preview_token')
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news/preview?preview_token=' + query).then((res) => res.json());
    return NextResponse.json(res)
}
