import "./index.css";

export default ({ Icon, onClick = () => { }, children }) => {
    return <button onClick={onClick}>{Icon && <Icon fontSize={"1.5rem"} style={{ margin: "0 2px" }} />}{children}</button>;
}