import Logo from "../Images/logo.png";

import "./index.css";

export default () => {
    return <header>
        <div>
            <img src={Logo} alt="花中查詢" width={50} />
            <div>
                <h1>Zark 每日單字查詢器</h1>
                <h5>Powered by <a href="https://hlhsinfo.muisnowdevs.one">花中查詢</a></h5>
            </div>
        </div>
    </header>;
}