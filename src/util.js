import { createRoot } from "react-dom/client";
import { FaCircleNotch } from "react-icons/fa";

import PopUp from "./PopUp";

export const Loading = ({ extra }) => {
    const TEXT = [
        "史詩",
        "快速",
        "超級",
        "無限",
        "暫時",
        "放棄",
        "QQ",
        "好喔",
        "啥?",
        "正常"
    ]

    return <div className="center topMargin">
        <div className="textCenter">
            <FaCircleNotch
                fontSize={"5rem"}
                className = "cycle"
                fill="#1a41ff" />
            <h3 className="topMargin">{randomGetArray(TEXT)}載入中...</h3>
            { extra && <h4>正在<span id="loadEvent">{extra}</span>中...</h4> }
        </div>
    </div>
}

// From https://stackoverflow.com/a/5915122
export const randomGetArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const errorShow = (error, navigate) => {
    navigate("/error", {
        state: {
            error
        }
    })
}

export const genRandomString = (length) => (Math.random() * length * Math.pow(10, length)).toString(36).substring(0, length);

export const showPopUp = (title, children) => {
    let pop = document.createElement("div");
    pop.id = "popup";
    document.body.appendChild(pop);
    createRoot(document.querySelector("#popup")).render(<PopUp title={title} onClose={() => {
        document.querySelector("#popup")?.remove();
    }}>{children}</PopUp>);
}