import { createRoot } from "react-dom/client";
import { FaCircleNotch } from "react-icons/fa";

import PopUp from "./Elements/PopUp";

let popupRender;
export const initPopUp = () => {
    if (popupRender) return;

    let pop = document.createElement("div");
    pop.id = "popup";
    document.body.appendChild(pop);

    popupRender = createRoot(document.querySelector("#popup"))
}

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
        "正常",
        "WTF",
        "沒空"
    ];

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

export const showPopUp = (title, children, onClose = () => { }) => {
    if (!popupRender) initPopUp();

    popupRender.render(<PopUp title={title} onClose={() => {
        popupRender.render(<></>);
        onClose();
    }}>{children}</PopUp>);
}

export const monthsData = [
    ["January", "一月"],
    ["February", "二月"],
    ["March", "三月"],
    ["April", "四月"],
    ["May", "五月"],
    ["June", "六月"],
    ["July", "七月"],
    ["August", "八月"],
    ["September", "九月"],
    ["October", "十月"],
    ["November", "十一月"],
    ["December", "十二月"]
];

export const getMonth = (monthString) => {
    if (typeof monthString === "number") return monthsData[monthString - 1];
    return monthsData.find(e => e[0] === monthString || e[1] === monthString);
}

// Check PWA is not always working
// From https://stackoverflow.com/a/41749865
export const isPWA = () => !!(navigator.standalone || window.matchMedia("(display-mode: standalone)").matches);
export const calcIframeWidth = () => Math.round(Math.sqrt(1000 * 1000 - window.innerWidth * window.innerWidth));