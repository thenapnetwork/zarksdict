import { useEffect, useState, Suspense } from "react";
import { FaTwitter } from "react-icons/fa";

import { initAPI, initOAuth } from "../Elements/Google/APIs";

import Header from "../Header";
import Router from "../Router";
import Footer from "../Footer";

import { Loading, showPopUp } from "../util";

import "./index.css";

export default () => {
    const [mount, setMount] = useState(<Loading />);

    useEffect(() => {
        async function a() {
            if (navigator.onLine) await Promise.all([initAPI(), initOAuth()]);
            setMount(<Router />);

            if (!localStorage.getItem("newfunc-1")) {
                showPopUp("新功能！", <div>
                    <h1>讓我們與AI接軌！ - Zark's Dictionary Helper</h1>
                    <p>我們推出了一項新功能，讓您可以使用AI功能來生成範例！</p>
                    <p>當您點擊一個單字時，Zark's Dictionary Helper將會自動出現！</p>
                </div>, () => localStorage.setItem("newfunc-1", "true"));
            }
        }

        a();
    }, []);

    return <>
        <Header />

        <Suspense fallback={<Loading />}>
            {/* Zark's Dictionary App Pages mount. */}
            <div className="mainApp">
                <div>
                    {mount}
                </div>
            </div>
        </Suspense>

        <Footer />
    </>;
}