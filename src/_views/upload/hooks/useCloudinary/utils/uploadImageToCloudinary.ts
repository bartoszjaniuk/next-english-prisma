'use client'
import { CLOUDINARY_API_URL } from "../constants/cloudinaryApiUrl.consts";

export const uploadImageToCloudinary = async (imageFile: File) => {
    const formData = new FormData();
    const presetKey = process.env.NEXT_PUBLIC_UPLOAD_PRESET_NAME as string;
    formData.append("file", imageFile);
    formData.append("upload_preset", presetKey);
    return await fetch(CLOUDINARY_API_URL, {
        method: 'POST',
        body: formData,
    })
};