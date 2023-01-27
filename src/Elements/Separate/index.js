import "./index.css";

export default ({ children }) => {
    return <div className="separate">
        <span>{children}</span>
    </div>;
}