import { getCurrentPage } from "@/utils/api/book/getCurrentPage";

export async function GET(request: Request) {
    const { searchParams, } = new URL(request.url)
    const bookId = searchParams.get('id') as string;
    const bookCurrentPage = await getCurrentPage(bookId);
    return Response.json({ bookCurrentPage })
}