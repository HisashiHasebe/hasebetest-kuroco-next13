import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get('preview_token')
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/rcms-api/1/news/preview?preview_token=' + token).then((res) => res.json());
    return NextResponse.json(res)
}
