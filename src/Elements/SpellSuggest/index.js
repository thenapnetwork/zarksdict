const SUGGESTION_API = "https://api.datamuse.com/words?sp=";

export default (word) => {
    return new Promise(async (res, rej) => {
        if (!navigator.onLine) return res([]);

        try {
            const suggestion = (await fetch(SUGGESTION_API + word)).json();
            return res(await suggestion);
        } catch (err) {
            return res([]);
        }
    });
}