import "./index.css";

export default ({ english, chinese, onClick = () => { } }) => {
    return <div className="wordBox" onClick={onClick}>
        <h3>{chinese || "未定義"}</h3>
        <h1>{english || "未定義"}</h1>
    </div>;
}