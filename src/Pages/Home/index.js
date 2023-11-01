import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaRegFile, FaQuestion } from "react-icons/fa";
import { MdFunctions } from "react-icons/md";

import { calcIframeWidth, isPWA } from "../../util";
import Separate from "../../Elements/Separate";
import Intro from "../../Elements/Intro";
import Button from "../../Elements/Button";
import { useExternalScripts } from "../../Hooks";

export default () => {
    const wid = calcIframeWidth();
    const [iframeHight, setiframeHight] = useState(wid === wid ? wid : 320);
    
    useExternalScripts("https://nap.social/embed.js");

    useEffect(() => {
        new ResizeObserver(() => {
            const size = calcIframeWidth();
            setiframeHight(size === size ? size : 320);
        }).observe(document.body);
    }, []);

    return isPWA() || localStorage.getItem("isNotFirst")
        ? <div>
            <div className="center">
                <div className="btns">
                    <Link to={"/login"}><Button Icon={FaPlay}>讓我們開始吧!</Button></Link>
                    <Link to={"/functions"}><Button Icon={MdFunctions}>更多功能</Button></Link>
                    <Separate>或</Separate>
                    <Link to={"/usage"}><Button Icon={FaRegFile}>使用說明</Button></Link>
                </div>
            </div>

            <Intro>
                <h2>你知道嗎? 11月是NNN喔!</h2>
                <iframe
                    src="https://nap.social/@muisnow/111334682021388432/embed"
                    className="mastodon-embed"
                    style={{
                        maxWidth: "100%",
                        border: 0
                    }}
                    width="400"
                    allowFullScreen="allowfullscreen"></iframe>
            </Intro>

            <div className="center">
                <div style={{
                    width: "100%"
                }}>
                    <iframe id="countdown" src="https://twmsss.github.io/GSAT-Timer/#/embed" style={{
                        width: "100%",
                        height: iframeHight,
                        border: 0
                    }}></iframe>
                    <p>Countdown timer from: <a href="https://twmsss.github.io/GSAT-Timer/">https://twmsss.github.io/GSAT-Timer/</a></p>
                </div>
            </div>
        </div>
        : <div>
            <Intro>
                在<span className="highlight">Zark老師</span>的教導下，我們多了許多的機會可以背單字，可是Excel並不易閱讀，因此我們製作了這一個系統來幫助學生們找到他們需要的當天單字。
            </Intro>

            <div className="topMargin">
                <div>
                    <h1>功能簡介</h1>
                    <h3>我們快速幫你把長到複雜的大筆Excel資料做分析處理，並把最簡單直接的結果顯示於您的眼前!</h3>
                    <h4>就如同這張圖一樣</h4>
                    <h3>您提供檔案，系統幫你解析，你看到最簡單易懂的資料</h3>
                    <img src="https://cdn.discordapp.com/attachments/964148338607927426/1048380326440865792/zarksdict.png" />
                </div>
            </div>

            <div className="center">
                <div className="width80">
                    <Intro>
                        您的意見很重要，發現系統障礙、錯誤或是希望新增功能，<a href="https://forms.gle/4GThakfbrCvTfiod6">請填寫此表單</a>
                    </Intro>
                </div>
            </div>

            <div className="center">
                <div style={{
                    width: "100%"
                }}>
                    <iframe id="countdown" src="https://twmsss.github.io/GSAT-Timer/#/embed" style={{
                        width: "100%",
                        height: iframeHight,
                        border: 0
                    }}></iframe>
                    <p>Countdown timer from: <a href="https://twmsss.github.io/GSAT-Timer/">https://twmsss.github.io/GSAT-Timer/</a></p>
                </div>
            </div>

            <div className="center">
                <div className="btns">
                    <Link to={"/login"}><Button Icon={FaPlay}>讓我們開始吧!</Button></Link>
                    <h4>如有使用上的問題，請點擊下方的「使用說明」</h4>
                    <h3>使用「<a href="https://sanzi.page.link/hlhsinfo">花中查詢</a>」來查詢、分析、分享你的花中成績!</h3>

                    <Separate>或</Separate>

                    <Link to={"/usage"}><Button Icon={FaRegFile}>使用說明</Button></Link>
                    <Button Icon={FaQuestion}>常見問題</Button>
                </div>
            </div>
        </div>;
}