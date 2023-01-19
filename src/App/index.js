import { useEffect, useState } from "react";

import { initAPI, initOAuth } from "../Google/APIs";

import Header from "../Header";
import Router from "../Router";
import Footer from "../Footer";

import { Loading, genRandomString } from "../util";

export default () => {
    const [mount, setMount] = useState(<Loading />);

    useEffect(() => {
        async function a() {
            await Promise.all([initAPI(), initOAuth()]);
            setMount(<Router />);
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