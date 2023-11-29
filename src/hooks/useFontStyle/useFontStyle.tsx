import { useFontFromQuery } from "@/_views/materials/components/toolbar/components/fontTool/hooks/useFontFromQuery";
import { GoogleFonts } from "@/enums/fonts.enum";
import { SavedWordsReturnType } from "@/utils/api/savedWords/getSavedWords";


export const useFontStyle = () => {
	const { queryClient, bookKey, id } = useFontFromQuery();
	const dataFromCache: SavedWordsReturnType | undefined =
		queryClient.getQueryData([bookKey.savedWords(id)]);
	const fontStyle = dataFromCache?.fontStyle || GoogleFonts.SOURCE_SANS_3;
	return fontStyle;
};
