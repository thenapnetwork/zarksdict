import { MdNorthEast } from "react-icons/md";
import { useAIGenerateExample } from "../../../Hooks";

export default ({ english, type, chinese }) => {
    const AIGeneratedExample = useAIGenerateExample(english);

    return <>
        <div>
            <div>
                <h1>{english} ({type}.)</h1>
                <h3>中文意思: {chinese}</h3>
            </div>
            <div style={{
                marginTop: 15
            }}>
                <h1>AI 生成例句 <span style={{
                    fontSize: ".8rem",
                    backgroundColor: "#4287f5",
                    borderRadius: 30,
                    padding: 5,
                    color: "#fff"
                }}>Alpha</span></h1>
                <h3>請注意！目前AI生成例句正處於早期預覽(Alpha)版本，因此未預期錯誤可能將會發生</h3>
                <p style={{
                    border: "1px #707070 solid",
                    borderRadius: 15,
                    padding: 15,
                    fontSize: "1.3rem"
                }}>
                    {AIGeneratedExample === undefined && "正在等待伺服器回應..."}
                    {AIGeneratedExample === false && "抱歉！我們暫時無法提供此服務"}
                    {AIGeneratedExample && AIGeneratedExample.replace(" Example: ", "例句: ")}
                </p>
            </div>
        </div>
        <div>
            <a target="_blank" href={"https://www.google.com/search?q=" + english}><MdNorthEast fontSize={23} />於 <span className="special">Google</span> 上查詢「{english}」的意思</a>
            <a target="_blank" href={"https://translate.google.com.tw/?hl=zh-TW&sl=en&tl=zh-TW&op=translate&text=" + english}><MdNorthEast fontSize={23} />於 <span className="special">Google 翻譯</span> 上查詢「{english}」的意思</a>
            <a target="_blank" href={"https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/" + english}><MdNorthEast fontSize={23} />於 <span className="special">Cambridge Dictionary</span> 上查詢「{english}」的意思</a>
        </div>
    </>;
}