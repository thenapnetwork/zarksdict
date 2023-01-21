import { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";

import { initAPI, initOAuth } from "../Google/APIs";

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

            if (!localStorage.getItem("isNotFirst")) {
                showPopUp("你好!", <div>
                    <p>歡迎使用這個工具！我很高興你會發現這個神奇的網頁工具。</p>
                    <p>你好！我是製作這個工具的人Muisnow，很高興你會開啟這個工具然後使用它(雖然不知道你會不會使用)</p>
                    <p>現在由於程式的架構改變，因此我們可以新增更多實用功能到這裡，如果你能提供我們開發的意見且我們能夠應付，我們將會把你所需的功能添加進來。</p>
                    <p>就這樣了，祝你使用愉快！</p>
                    <br />
                    <p><FaTwitter /> - @Hen000000hen</p>
                </div>, () => localStorage.setItem("isNotFirst", "true"));
            }
        }

        a();
    }, []);

    return <>
        <Header />

        {/* Zark's Dictionary App Pages mount. */}
        <div className="mainApp">
            <div>
                {mount}
            </div>
        </div>

        <Footer />
    </>;
}