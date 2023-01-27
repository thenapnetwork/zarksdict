import { genRandomString } from "../../util";

import "./index.css";

export default ({ title, defaultValue, onChange = () => { } }) => {
    const ID = genRandomString(5);

    return <div className="input">
        <label htmlFor={ID}>{title}</label>
        <input id={ID} defaultValue={defaultValue} onChange={(val) => onChange(val.target.value)} />
    </div>;
}