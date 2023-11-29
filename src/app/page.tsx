import { getBooksWithoutDetails } from "@/utils/api/book/getBooksWithoutDetails";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	const data = await getBooksWithoutDetails();

	return <div className="container">Hello, {session?.user?.email}</div>;
}
