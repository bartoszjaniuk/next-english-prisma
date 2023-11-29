import { updateBookFontFamily } from "@/utils/api/book/updateBookFontFamily";

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const bookId = searchParams.get("id") as string;
	const data = await request.json();
	const bookCurrentPage = await updateBookFontFamily(bookId, data);
	return Response.json(bookCurrentPage);
}
