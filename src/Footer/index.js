import "./index.css";

export default () => {
    return <footer>
        <div>
            <span>Copyright © 2023 <a href="https://nap.tw">The NAP Platform</a> and <a href="https://muisnowdevs.one">Muisnow</a></span>
            <span>Git Version: <span style={{
                fontFamily: "monospace"
            }}>{process.env.REACT_APP_COMMIT_HASH.substring(0, 7) || "DEV VER"}</span></span>
            <span><a href="/privacy.html">Privacy Policy</a></span>
            <span>This is an <a href="https://github.com/thenapnetwork/zarksdict">open-source project</a>.</span>
        </div>
    </footer>;
}
