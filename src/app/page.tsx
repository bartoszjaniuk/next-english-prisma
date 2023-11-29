import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
	const session = await getServerSession(authOptions);

	return <div className="container">Hello, {session?.user?.email}</div>;
}
