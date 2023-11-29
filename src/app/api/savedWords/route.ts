import { getSavedWords } from "@/utils/api/savedWords/getSavedWords";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id") as string;
	const savedWords = await getSavedWords(id);
	return Response.json({ savedWords });
}
