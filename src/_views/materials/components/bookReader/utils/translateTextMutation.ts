import { TRANSLATE_API_URL } from "../constants/translation.consts";
import { Translation } from "../models/translation.types";



export const translateTextMutation = async (
    wordToTranslate: string
): Promise<Translation> => {
    const res = await fetch(TRANSLATE_API_URL, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": "9681a355admsh9b82bbb1eb04046p148313jsn63b145f7b11c",
            "X-RapidAPI-Host": "translate-it1.p.rapidapi.com",
        },
        body: JSON.stringify({
            q: wordToTranslate,
            source: "en",
            target: "pl",
        }),
    })

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = res.json();

    return data;
};

