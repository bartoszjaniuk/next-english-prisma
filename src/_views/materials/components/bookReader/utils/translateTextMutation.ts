import { TRANSLATE_API_URL } from "../constants/translation.consts";

export const translateTextMutation = async (
	wordToTranslate: string,
): Promise<any> => {
	const encodedParams = new URLSearchParams();
	encodedParams.set("source_language", "en");
	encodedParams.set("target_language", "pl");
	encodedParams.set("text", wordToTranslate);
	const rapidApiKey = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY as string;

	const res = await fetch(TRANSLATE_API_URL, {
		method: "POST",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Key": rapidApiKey,
			"X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
		},
		body: encodedParams,
	});

	if (!res.ok) {
		throw new Error(`HTTP error! status: ${res.status}`);
	}
	const data = await res.json();

	return data.data.translatedText;
};
