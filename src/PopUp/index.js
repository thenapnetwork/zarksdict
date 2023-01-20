import { MdClose } from "react-icons/md";

import "./index.css";

export default ({ title, children, onClose = () => { } }) => {
    return <div className="popup" onClick={(event) => event.target.classList.contains("popup") && onClose()}>
        <div>
            <div className="header">
                <h3>{title}</h3>
                <h3 className="close" onClick={onClose}><MdClose /></h3>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    </div>;
}