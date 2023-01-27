import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

import Intro from "../../Elements/Intro";
import Button from "../../Elements/Button";

export default () => {
    const [display, setDisplay] = useState(<></>);
    const navigate = useNavigate();
    const { state } = useLocation();
    
    useEffect(() => {
        try {
            setDisplay(state.error);
        } catch (err) {
            navigate("/");
            return;
        }
    }, []);

    return <div>
        <div className="center">
            <div className="width80">
                <Intro isError={true}>{display}</Intro>
            </div>
        </div>

        <div className="center">
            <Link to={"/"}><Button Icon={FaChevronLeft}>返回首頁</Button></Link>
        </div>
    </div>
}