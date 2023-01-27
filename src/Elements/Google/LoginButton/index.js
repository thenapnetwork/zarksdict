import "./index.css";
import { ReactComponent as GoogleSVG } from "./googleLogo.svg";

export default ({ onClick = () => { } }) => {
    return <div className="google-btn" onClick={onClick}>
        <div className="google-icon-wrapper">
            <GoogleSVG height={18} />
        </div>
        <div className="google-text">
            <p className="btn-text"><b>Sign in with Google</b></p>
        </div>
    </div>;
}