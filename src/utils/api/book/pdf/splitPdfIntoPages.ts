import { PDFDocument as pdfDocument } from "pdf-lib";
import pdfParse from 'pdf-parse';

export const splitPdfIntoPages = async (document: pdfDocument) => {
    let pages = [];
    const totalPages = document.getPageCount();
    for (let i = 0; i < totalPages; i++) {
        const subDocument = await pdfDocument.create();
        const [copiedPage] = await subDocument.copyPages(document, [i]);
        subDocument.addPage(copiedPage);
        const pdfBytes = await subDocument.save() as Buffer;
        const parsedPage = await pdfParse(pdfBytes)
        pages.push(parsedPage);
    }
    return { pages };
}