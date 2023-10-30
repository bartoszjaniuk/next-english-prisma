import pdfParse from 'pdf-parse';

export const splitPagesIntoArray = (inputPages: pdfParse.Result[], fileName: string) => {
    const pages = inputPages.map((data, index) => {
        const wholePage = data.text;
        const formattedPage = wholePage.replace(/\n/g, ' ').replace(/\t/g, ' ');
        const wholeFormattedPageAsArrayOfStrings = formattedPage.split(' ');
        return {
            numberOfPage: index + 1,
            words: wholeFormattedPageAsArrayOfStrings.map((text) => {
                return { isTranslated: false, translation: '', content: text };
            }),

        };
    });
    return {
        totalPages: pages.length,
        pages,
        title: fileName,
    };
};