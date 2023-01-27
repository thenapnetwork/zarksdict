import "./index.css";

export default ({ children, isError }) => {
    return <p className={`intro ${isError && "err"}`}>
        {children}
    </p>;
}