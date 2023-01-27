import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

import Button from "../../Elements/Button";
import Intro from "../../Elements/Intro";

export default () => {
    return <div className="topMargin">
        <h3>就如同主頁上所描述的一樣，這個工具可以簡單的幫助你查詢當天的單字資料。</h3>
        <img src="https://cdn.discordapp.com/attachments/964148338607927426/1048380326440865792/zarksdict.png" />
        <div className="topMargin">
            <h1>使用步驟</h1>
            <div>
                <h1>步驟一</h1>
                <h3>使用您的Google帳戶進行登入 (這是為了取得資料存取權限)</h3>
                <img src="https://cdn.discordapp.com/attachments/964148338607927426/1048261124342153216/image.png" />
            </div>

            <div>
                <h1>步驟二</h1>
                <div className="center">
                    <div className="width80">
                        <Intro isError={true}>
                            注意! 這裡的檔案有限定，僅能使用Zark製作的格式的Sheet檔案。範例如這<a href="https://docs.google.com/spreadsheets/d/1vIG7wfsFLpQefjYlsUbTub421Z90hFCdLs9L2wKQNtY">https://docs.google.com/spreadsheets/d/1vIG7wfsFLpQefjYlsUbTub421Z90hFCdLs9L2wKQNtY</a>
                        </Intro>
                    </div>
                </div>
                <h3>選擇一個你能夠取得檔案的方式</h3>
                <img src="https://cdn.discordapp.com/attachments/964148338607927426/1048262448127426560/image.png" />
            </div>

            <div>
                <h1>步驟三</h1>
                <h3>等待系統分析完成，您即可快速查看了!</h3>
                <img src="https://cdn.discordapp.com/attachments/964148338607927426/1048263283389505596/image.png" />
            </div>
        </div>

        <div className="center">
            <Link to={"/"}><Button Icon={FaChevronLeft}>返回主頁</Button></Link>
        </div>
    </div>;
}