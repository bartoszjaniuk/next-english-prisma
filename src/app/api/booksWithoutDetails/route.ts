import { getBooksWithoutDetails } from "@/utils/api/book/getBooksWithoutDetails";

export async function GET() {
	const data = await getBooksWithoutDetails();
	return Response.json({ data });
}
