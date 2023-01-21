import { Link } from "react-router-dom";
import { FaPencilAlt, FaBell } from "react-icons/fa";

import { isPWA } from "../../util";
import Button from "../../Button";

export default () => {
    return <div>
        <h1>更多功能</h1>
        <h3>使用這些功能來讓幫助你學習更多的單字!</h3>
        <h5>請注意! 部分功能要求你先安裝PWA應用。</h5>

        <div className="btns" style={{
            position: "relative",
            minWidth: "100%",
            minHeight: "150px"
        }}>

            {/* TODO: Add Functions */}
            <div style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#0000008c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "15px"
            }}>
                <h1 style={{
                    color: "#fff"
                }}>開發中...</h1>
            </div>
            <Link to={"/exam"}><Button Icon={FaPencilAlt}>隨機測驗</Button></Link>
            <Button Icon={FaBell} isDisable={!isPWA()}>自動通知{!isPWA() && "(需安裝PWA)"}</Button>
        </div>
    </div>;
}