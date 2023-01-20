import "./index.css";

export default ({ Icon, isDisable = false, onClick = () => { }, children }) => {
    return <button disabled={isDisable} onClick={onClick}>{Icon && <Icon fontSize={"1.5rem"} style={{ margin: "0 2px" }} />}{children}</button>;
}