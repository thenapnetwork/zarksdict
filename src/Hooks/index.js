import { useEffect, useState } from 'react';

export function useExternalScripts(url) {
    useEffect(() => {
        const head = document.querySelector("head");
        const script = document.createElement("script");

        script.setAttribute("src", url);
        head.appendChild(script);

        return () => {
            head.removeChild(script);
        };
    }, [url]);
};

export function useAIGenerateExample(word) {
    const [example, setExample] = useState(undefined);

    useEffect(() => {
        let word_list = [];

        const event = new EventSource("https://zkdword-example-85ef.sanzi.workers.dev/".concat(word));
        event.onmessage = (eventd) => {
            setExample(word_list.join(""));
            if (eventd.data.includes("[DONE]")) return event.close();

            let data = JSON.parse(eventd.data).response;
            if (data.trim().length === 0 && word_list.length === 0) return;
            if (data === word_list[word_list.length - 1] && data === ".") return;
            word_list.push(data);
        };

        event.onerror = () => setExample(false);

        return () => event.close();
    }, [word]);

    return example;
}