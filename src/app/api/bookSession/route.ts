import { getBookSession } from "@/utils/api/bookSession/getBookSession";
import { updateBookSession } from "@/utils/api/bookSession/updateBookSession";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const bookId = searchParams.get("id") as string;
	const bookCurrentPage = await getBookSession(bookId);
	return Response.json(bookCurrentPage);
}

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url);
	const bookId = searchParams.get("id") as string;
	const data = await request.json();
	const bookCurrentPage = await updateBookSession(bookId, data);
	return Response.json(bookCurrentPage);
}
