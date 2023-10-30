import { PDFDocument as pdfDocument } from "pdf-lib";
import { splitPdfIntoPages } from "./splitPdfIntoPages";
import { splitPagesIntoArray } from "./splitPagesIntoArray";

export const convertPdfIntoObject = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const loadedDocument = await pdfDocument.load(buffer);

    const bookTitle = loadedDocument.getTitle() || 'Brak tytułu';

    const { pages } = await splitPdfIntoPages(loadedDocument)

    const book = splitPagesIntoArray(pages, bookTitle);

    return book;
}