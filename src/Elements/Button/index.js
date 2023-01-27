import "./index.css";

export default ({ Icon, isDisable = false, onClick = () => { }, children }) => {
    return <button disabled={isDisable} onClick={onClick}>{Icon && <Icon fontSize={"1.7rem"} style={{ margin: children && "0 2px" }} />}{children}</button>;
}