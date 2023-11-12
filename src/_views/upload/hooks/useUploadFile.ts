'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCloudinary } from "./useCloudinary";

type UseUploadFileProps = {
    resetStep: VoidFunction;
    nextStep: VoidFunction;
};

export const useUploadFile = ({ resetStep, nextStep }: UseUploadFileProps) => {
    const [isLoadingFile, setIsLoadingFile] = useState(false);
    const [bookFile, setBookFile] = useState<File>();
    const [bookFileErrorMessage, setBookFileErrorMessage] = useState<
        string | undefined
    >(undefined);

    const { cloudinaryImageUrl, uploadImage, isLoadingPhoto } = useCloudinary(nextStep)

    useEffect(() => {
        if (!bookFileErrorMessage) return;
        setTimeout(() => {
            setBookFileErrorMessage(undefined);
        }, 4000);

    }, [bookFileErrorMessage, setBookFileErrorMessage]);

    const bookFileRef = useRef<HTMLInputElement | null>(null);

    const uploadBook = async (file: File, bookTitle: string) => {
        if (!file) return;
        setIsLoadingFile(true);
        const data = new FormData();
        data.set('file', file);
        data.set('imageUrl', cloudinaryImageUrl);
        data.set('bookTitle', bookTitle);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data
        });
        setIsLoadingFile(false);
        return res.json();
    }

    const handleBookFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSizeInBytes) {
            return setBookFileErrorMessage(
                "Limit wielkości pliku został przekroczony. 🔥"
            );
        }

        const allowedTypes = ["application/pdf"];
        if (!allowedTypes.includes(file.type)) {
            return setBookFileErrorMessage(
                "Nieprawidłowy typ pliku. Tylko pliki PDF są dozwolone."
            );
        }

        if (e.target.files) {
            setBookFile(e.target.files[0]);
            setBookFileErrorMessage(undefined);
        }
    };

    const handleRemoveBookFile = () => {
        setBookFile(undefined);
        setBookFileErrorMessage(undefined);
        resetStep();
        if (!bookFileRef.current) return;
        bookFileRef.current.value = "";
    };



    const handleUploadFile = async ({ image }: { image: File }) => {
        if (!bookFile) return;
        if (!cloudinaryImageUrl) return await uploadImage(image);
        nextStep();
    };


    const isLoading = isLoadingFile || isLoadingPhoto;


    return {
        isLoading,
        bookFileRef,
        handleUploadFile,
        handleBookFileChange,
        handleRemoveBookFile,
        uploadBook,
        bookFileErrorMessage,
        bookFile,
        cloudinaryImageUrl,
    }

}
