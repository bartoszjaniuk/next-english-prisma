'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useStepper } from './hooks/useStepper';
import { UploadFileFormFieldValues } from './models/UploadFileForm.types';
import { schema } from './constants/schema.consts';
import { useFile } from './hooks/useFile';
import { DragAndDropZone } from './components/dragAndDropZone/DragAndDropZone';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

export const UploadContainer = () => {
    const { step, nextStep, prevStep, resetStep } = useStepper();

    const {
        handleFileChange: handleImageChange,
        file,
        fileRef: imageFileRef,
        previewUrl,
        imageFileErrorMessage,
    } = useFile();


    const {
        register,
        getValues,
        formState: { isValid },
    } = useForm<UploadFileFormFieldValues>({
        resolver: zodResolver(schema),
        reValidateMode: "onSubmit",
        mode: "all",
    });

    const uploadBook = async () => {
        if (!file) return;
        const data = new FormData();
        data.set('file', file);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: data
        });
        return res.json();

    }
    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await uploadBook();
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <form className="w-full">
            <div className="mb-6  w-full">
                <label
                    htmlFor="bookName"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                    Nazwa pliku*
                </label>
                <input
                    {...register("bookName")}
                    type="text"
                    id="bookName"
                    className="bg-layoutLight border border-gray-200 text-gray-900 text-sm font-medium rounded-md block w-full p-4 dark:text-layoutLight dark:bg-layoutDark dark:border-gray-700"
                />
            </div>

            <DragAndDropZone
                fileRef={imageFileRef}
                handleFileChange={handleImageChange}
                label="Okładka"
                errorMessage={imageFileErrorMessage}
            />
            {file && <button className='bg-primary p-4' onClick={handleUpload}>Prześlij plik</button>}

        </form>
    )
}
