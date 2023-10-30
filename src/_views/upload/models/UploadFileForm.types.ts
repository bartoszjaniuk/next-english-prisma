import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { schema } from "../constants/schema.consts";

export type UploadFileFormFieldValues = z.infer<typeof schema>;

export type UploadFileFormProps = {
    onSubmit: SubmitHandler<UploadFileFormFieldValues>;
    isLoading: boolean;
    defaultValues?: UploadFileFormFieldValues;
};
