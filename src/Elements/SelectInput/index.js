import { genRandomString } from "../../util";

export default ({ title, defaultValue, options = [], onChange = () => { } }) => {
    const ID = genRandomString(5);

    return <div className="input">
        <label htmlFor={ID}>{title}</label>
        <select id={ID} value={defaultValue} onChange={(val) => onChange(val.target.value)}>{options.map(e => <option key={genRandomString(30)} value={e}>{e}</option>)}</select>
    </div>;
}