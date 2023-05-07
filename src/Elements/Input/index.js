import { genRandomString } from "../../util";

import "./index.css";

export default ({ title, type, defaultValue = "", onChange = () => { }, rightFunctions = [], inputArgs = {} }) => {
    const ID = genRandomString(5);

    return <div className="input">
        <label htmlFor={ID}>{title}</label>
        <div style={{
            display: "flex"
        }}>
            <input id={ID} defaultValue={defaultValue} defaultChecked={type == "checkbox" && defaultValue == true} type={type || "text"} onChange={(val) => onChange(val.target.value, val.target)} {...inputArgs} />
            <div style={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap"
            }}>
                {rightFunctions.filter(e => e.active).map(e => <div key={genRandomString(8)} style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%"
                }}>
                    <button onClick={e.onClick}>{<e.Icon fontSize={"1.7rem"} style={{ margin: 0 }} />}</button>
                </div>)}
            </div>
        </div>
    </div>;
}