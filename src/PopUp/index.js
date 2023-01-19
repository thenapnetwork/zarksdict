import { MdClose } from "react-icons/md";

import "./index.css";

export default ({ title, children, onClose = () => { } }) => {
    return <div className="popup">
        <div>
            <div class="header">
                <h3>{title}</h3>
                <h3 class="close" onClick={onClose}><MdClose /></h3>
            </div>
            <div class="body">
                {children}
            </div>
        </div>
    </div>;
}