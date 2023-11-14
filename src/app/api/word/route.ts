import { updateWord } from "@/utils/api/word/updateWord";

export async function POST(request: Request) {
	const data = await request.json();
	const bookCurrentPage = await updateWord(data);
	return Response.json(bookCurrentPage);
}
