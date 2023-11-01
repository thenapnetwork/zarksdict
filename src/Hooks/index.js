import { useEffect } from 'react';

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