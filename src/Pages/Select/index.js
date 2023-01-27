import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogleDrive, FaLink, FaChevronLeft, FaRegFile } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

import { isLogined, FilePicker, getUserInfo, Logout } from "../../Elements/Google/APIs";
import Button from "../../Elements/Button";
import Separate from "../../Elements/Separate";
import AccountCard from "../../Elements/Google/AccountCard";

export default () => {
    const navigate = useNavigate();
    const [accountInfo, setAccountInfo] = useState({
        isFetched: false
    });

    useEffect(() => {
        if (!isLogined()) return;
        getUserInfo().then((data) => {
            setAccountInfo({ isFetched: true, ...data });
        });
    }, []);

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
                        {
                            accountInfo.isFetched && <div style={{
                                textAlign: "start",
                                marginBlock: 15
                            }}>
                                <h3>當前登入為</h3>
                                <AccountCard userName={accountInfo.name} userEmail={accountInfo.email} userPicture={accountInfo.picture} />
                            </div>
                        }
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