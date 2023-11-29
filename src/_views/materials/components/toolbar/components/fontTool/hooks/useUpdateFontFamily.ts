import { useMutation } from "@tanstack/react-query";
import { useFontFromQuery } from "./useFontFromQuery";

export const useUpdateFontFamily = () => {
	const { bookKey, id, invalidateQuery } = useFontFromQuery();

	const { mutate: updateFontStyle, isPending } = useMutation({
		mutationFn: async (payload: string) => {
			const res = await fetch(`../api/book/fontStyle?id=${id}`, {
				method: "POST",
				body: JSON.stringify(payload),
			});
			if (!res.ok) return null;
			const data = await res.json();

			return data;
		},
		onSuccess: () => {
			invalidateQuery(bookKey.savedWords(id));
		},
	});

	return { updateFontStyle, isUpdating: isPending };
};
