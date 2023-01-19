import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

import { OAuthClient, isLogined } from "../Google/APIs";
import LoginButton from "../Google/LoginButton";
import Separate from "../Separate";
import Button from "../Button";

export default () => {
    const navigate = useNavigate();

    useEffect(() => {
        let checkLogin = setInterval(() => {
            if (isLogined()) navigate("/select");
        }, 200);

        return () => {
            clearInterval(checkLogin);
        }
    }, []);

    return <div className="center">
        <div className="textCenter">
            <h1>讓我們登入吧!</h1>
            <h4>從登入你的Google帳號開始(需要有權限的)</h4>

            <div className="center topMargin">
                <LoginButton onClick={() => OAuthClient().requestAccessToken()} />
            </div>

            <Separate>或</Separate>

            <Link to={"/"}><Button Icon={FaChevronLeft}>返回主頁</Button></Link>
        </div>
    </div>
}