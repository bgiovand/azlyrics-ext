export const constants = {
    searchUrl: "https://search.azlyrics.com/search.php",
    userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
    typeErr: (key: string, expected: string, received: string) =>
        `Expected typeof '${key}' to be' ${expected}' but received '${received}'!`,
};
