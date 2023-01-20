import { useNavigate } from "react-router-dom";
import { FaGoogleDrive, FaLink, FaChevronLeft, FaRegFile } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { isLogined, FilePicker, Logout } from "../Google/APIs";
import Button from "../Button";
import Separate from "../Separate";

export default () => {
    const navigate = useNavigate();

    function fp() {
        FilePicker().then((data) => {
            const DOCUMENT = data[google.picker.Response.DOCUMENTS][0];
            const FILE = DOCUMENT[google.picker.Document.ID];

            gn(FILE);
        });
    }

    function gn(sheetID) {
        navigate("/view", {
            state: {
                file: sheetID
            }
        });
    }

    function lo() {
        if (isLogined()) Logout();
        navigate("/login");
    }

    return <div className="cter">
        <h1>選擇要解析的檔案</h1>
        <h4>無須擔心您的資料會被上傳至伺服器，這個系統全都在你的裝置上運行。</h4>
        <div className="center">
            <div className="btns">
                {
                    isLogined() &&
                    <>
                        <Button Icon={FaRegFile} onClick={() => gn("1LTTKTmuYSrG408_pSyazFsMlaMdHWCLOi2TgqzFzhQg")}>快速開啟該Sheet</Button>
                        <Button Icon={FaGoogleDrive} onClick={fp}>用 Google Drive 選擇</Button>
                        <Separate>或</Separate>
                    </>
                }

                <Button Icon={FaLink} onClick={() => {
                    let url = prompt("請輸入該Excel的網址。如: https://docs.google.com/spreadsheets/d/blablablabla");
                    if (!url.trim()) return;

                    gn((new URL(url)).pathname.split("/")[3])
                }}>Excel連結 (請確認權限)</Button>

                <Separate>其他</Separate>

                <Button Icon={isLogined() ? MdLogout : FaChevronLeft} onClick={lo}>{isLogined() ? "登出" : "返回"}</Button>
            </div>
        </div>
    </div>;
}