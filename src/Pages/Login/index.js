import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaHdd } from "react-icons/fa";

import { OAuthClient, isLogined, status } from "../../Elements/Google/APIs";
import { Database } from "../../db";
import LoginButton from "../../Elements/Google/LoginButton";
import Separate from "../../Elements/Separate";
import Button from "../../Elements/Button";

export default () => {
    const navigate = useNavigate();
    const [isLoadAble, setIsLoadAble] = useState(false);

    function ld() {
        navigate("/view", {
            state: {
                load: true
            }
        });
    }

    useEffect(() => {
        Database.setting.get("saveStatus").then(e => e && setIsLoadAble(true));
        let checkLogin = setInterval(() => {
            if (isLogined()) navigate("/select");
        }, 200);

        return () => {
            clearInterval(checkLogin);
        }
    }, []);

    return <div className="center">
        <div className="textCenter">
            <h1>讓我們開始吧!</h1>
            <h4>從登入你的Google帳號開始(需要有權限的)</h4>

            {
                (navigator.onLine && (status().API && status().OAuth))
                    ? <>
                        <div className="center topMargin">
                            <LoginButton onClick={() => OAuthClient().requestAccessToken()} />
                        </div>

                        <Separate>或</Separate>
                    </>
                    : <h3>您無法於離線狀態下查詢線上表單</h3>
            }

            {isLoadAble && <Button Icon={FaHdd} onClick={ld}>載入儲存的單字</Button>}
            <Link to={"/"}><Button Icon={FaChevronLeft}>返回主頁</Button></Link>
        </div>
    </div>
}