'use client'
import { useState } from 'react'
import { uploadImageToCloudinary } from './useCloudinary/utils/uploadImageToCloudinary';

export const useCloudinary = (nextStep: VoidFunction) => {
    const [cloudinaryImageUrl, setCloudinaryImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = async (imageFile: File) => {
        try {
            setIsLoading(true)
            const response = await uploadImageToCloudinary(imageFile)
            if (!response.ok) {
                setIsLoading(false)
                return;
            }
            const url = await response.json();
            setCloudinaryImageUrl(url)
            return nextStep();

        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }


    return { uploadImage, cloudinaryImageUrl, isLoadingPhoto: isLoading }
}
