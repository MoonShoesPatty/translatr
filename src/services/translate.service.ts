export const translate = async (sourceLang: string, destLang: string, queryText: string) => {
    const reqUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${destLang}&dt=t&q=${queryText}`;
    const response = await fetch(reqUrl);
    const result = await response.json();
    return result[0][0][0] as string;
}