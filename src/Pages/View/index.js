import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdDelete, MdNorthEast, MdTune } from "react-icons/md";

import { getSheet, getSheetsList } from "../../Elements/Google/APIs";
import { errorShow, Loading, genRandomString, showPopUp as createPopUp, getMonth } from "../../util";
import { Database } from "../../db";
import Button from "../../Elements/Button";
import Input from "../../Elements/Input";
import Separate from "../../Elements/Separate";
import SelectInput from "../../Elements/SelectInput";
import WordBox from "./WordBox";

import "./index.css";
import WordInfo from "./WordInfo";

export default () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({
        init: false
    });
    const [inputTarget, setInputTarget] = useState(null);
    const [loadStatus, setLoadStatus] = useState(undefined);
    const [search, setSearch] = useState("");
    const [selectParams, setSelectParams] = useState([0, "", 0]); // #0 => year, #1 => month, #2 => day
    const [saveStatus, setSaveStatus] = useState(false);

    const [searchConfig, setSearchConfig] = useState({
        startTime: null,
        endTime: null,
        limite: null,
        type: null,
    });

    function eleSetTarget(target) {
        if (inputTarget) return;
        setInputTarget(target);
    }

    function selectData(type, value) {
        if (type === 0) setSelectParams([
            value,
            Object.keys(data.formatedData[value])[0],
            Object.keys(data.formatedData[value][Object.keys(data.formatedData[value])[0]])[0]
        ]);
        if (type === 1) setSelectParams([
            selectParams[0],
            getMonth(value)[0],
            Object.keys(data.formatedData[selectParams[0]][getMonth(value)[0]])[0]
        ]);
        if (type === 2) setSelectParams([selectParams[0], selectParams[1], value]);
    }

    function showPopUp(chinese, english, type) {
        createPopUp("詳細資訊", <WordInfo
            chinese={chinese}
            english={english}
            type={type} />);
    }

    async function saveData() {
        setSaveStatus(true);
        if (await Database.words.count() > 0) {
            let setting = await Database.setting.get("saveStatus");
            let choise = confirm(`您確定要覆蓋您之前的儲存? 於${(new Date(setting.value.at)).toLocaleString()}儲存的${setting.value.length}筆資料。`);
            if (!choise) return;
            await Promise.all([Database.setting.where('setting').equals("saveStatus").delete(), Database.words.clear()]).then(e => console.log("Deleted"));
        }
        for (let w of data.wlist) {
            Database.words.add(w);
        }

        Database.setting.add({
            setting: "saveStatus",
            value: {
                at: Date.now(),
                length: data.wlist.length
            }
        });

        createPopUp("通知", "已儲存所有單字!");
    }

    useEffect(() => {
        let FILE;
        let isReadLocal = false;

        try {
            isReadLocal = state.load;
        } catch (err) { }

        async function b() {
            setLoadStatus("本地端資源");

            const date = new Date();
            let matches = [false, 0];

            const wlist = await Database.words.toArray();
            let formatedData = {};
            for (let dt of wlist) {
                if (!formatedData[dt.year]) formatedData[dt.year] = {};
                if (!formatedData[dt.year][dt.month]) formatedData[dt.year][dt.month] = {};
                if (!formatedData[dt.year][dt.month][dt.day]) formatedData[dt.year][dt.month][dt.day] = {};
                if (!formatedData[dt.year][dt.month][dt.day][dt.type]) formatedData[dt.year][dt.month][dt.day][dt.type] = [];

                if (dt.month == getMonth(date.getMonth() + 1)[0] && dt.day === date.getDate()) {
                    matches[0] = true;
                    matches[1] = dt.year;
                }

                formatedData[dt.year][dt.month][dt.day][dt.type].push({
                    chinese: dt.chinese,
                    english: dt.english
                });
            }

            setLoadStatus("載入");
            setData({ init: true, formatedData, wlist });

            setSelectParams([
                matches[0] ? matches[1] : Object.keys(formatedData)[0],
                matches[0] ? getMonth(date.getMonth() + 1)[0] : Object.keys(formatedData[Object.keys(formatedData)[0]])[0],
                matches[0] ? date.getDate() : Object.keys(formatedData[Object.keys(formatedData)[0]][Object.keys(formatedData[Object.keys(formatedData)[0]])[0]])[0]
            ]);
        }

        if (isReadLocal) {
            b();
            return;
        }

        try {
            FILE = state.file;
        } catch (err) {
            navigate("/");
            return;
        }

        async function a() {
            let sheetData;

            setLoadStatus("尋找檔案資源");

            try {
                setLoadStatus("載入檔案資源");
                let range = await getSheetsList(FILE);
                sheetData = await getSheet(FILE, range.result.sheets[0].properties.title);
            } catch (err) {
                console.log(err)
                switch (err.result.error.status) {
                    case "PERMISSION_DENIED":
                        errorShow("您所使用的Google帳號並沒有該Sheet的瀏覽權限，請換帳號開啟或換個檔案開啟。", navigate);
                        break;

                    case "NOT_FOUND":
                        errorShow("無法於Google上找尋該Sheet。請換個檔案連結。", navigate);
                        break;
                    
                    case "INVALID_ARGUMENT":
                        errorShow("查詢參數錯誤。請洽詢開發者。", navigate);
                        break;
                }

                return;
            }

            setLoadStatus("解析資料");

            const date = new Date();

            let formatedData = {};
            let wlist = []

            // let times = 0;
            let y = 0;
            let m = "";
            let bfM = "";
            let d = 0;

            let b = 0;

            let matches = [false, 0];

            let nType = [];

            try {
                for (let i = 0; i < sheetData.result.values.length; i++) {
                    let data = sheetData.result.values[i];
                    let l = data;
                    if (l[0]) {
                        if (l.length < 10) continue;
                        let s = l[0].split(" ");

                        if (s.length !== 2) {
                            s = l[1].split(" ");
                            b = 1;
                        }

                        bfM = m;
                        m = s[0];
                        d = Number(s[1]);
                        y = m !== getMonth(12)[0] && bfM === getMonth(12)[0] ? ++y : y;

                        if (m == getMonth(date.getMonth() + 1)[0] && d === date.getDate()) {
                            matches[0] = true;
                            matches[1] = y;
                        }

                        if (!formatedData[y]) formatedData[y] = {};
                        if (!formatedData[y][m]) formatedData[y][m] = {};

                        nType = [l[b + 1], l[b + 4], l[b + 7]].map(text => text.replace(/\((\w*)\.\)/gm, "$1"));
                        
                        formatedData[y][m][d] = {
                            [nType[0]]: [],
                            [nType[1]]: [],
                            [nType[2]]: []
                        };
                    }

                    // console.log(y, m, d)

                    for (let i = 0; i < 3; i++) {
                        if (!l[b + 3 + 3 * i] || !l[b + 2 + 3 * i]) continue;
                        wlist.push({
                            chinese: l[b + 3 + 3 * i],
                            english: l[b + 2 + 3 * i],
                            year: y,
                            month: m,
                            day: d,
                            type: nType[i]
                        })
                        formatedData[y][m][d][nType[i]].push({
                            chinese: l[b + 3 + 3 * i],
                            english: l[b + 2 + 3 * i]
                        });
                    }
                }

                setLoadStatus("載入");
                setData({ init: true, formatedData, wlist });

                setSelectParams([
                    matches[0] ? matches[1] : Object.keys(formatedData)[0],
                    matches[0] ? getMonth(date.getMonth() + 1)[0] : Object.keys(formatedData[Object.keys(formatedData)[0]])[0],
                    matches[0] ? date.getDate() : Object.keys(formatedData[Object.keys(formatedData)[0]][Object.keys(formatedData[Object.keys(formatedData)[0]])[0]])[0]
                ]);
            } catch (err) {
                console.error("Catch Error:", err);
                errorShow("您可能選擇到錯誤的檔案，本系統無法解析該Sheet，請返回然後再試一次。", navigate);
                return;
            }
        }

        a();
    }, []);

    // parserObject => {
    //     options: {
    //         year: [],
    //         month: [],
    //         day: []
    //     },
    //     display: undefined
    // }

    let parserObject = [
        [
            [],
            [],
            []
        ],
        undefined
    ]

    if (data.init) {
        parserObject[0][0] = Object.keys(data.formatedData).map(e => `第${e}年`);
        parserObject[0][1] = Object.keys(data.formatedData[selectParams[0]]).map(e => getMonth(e)[1]);
        parserObject[0][2] = Object.keys(data.formatedData[selectParams[0]][selectParams[1]]);

        if (!search.trim()) parserObject[1] = data.formatedData[selectParams[0]][selectParams[1]][selectParams[2]];
        else parserObject[1] = data.wlist.filter(e => e.english && e.english.includes(search.trim().toLowerCase()) || e.chinese && e.chinese.includes(search.trim()));
    }

    return !data.init
        ? <Loading extra={loadStatus} />
        : <div>
            <div className="function">
                <div style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>
                    <SelectInput title="年分" defaultValue={selectParams[0]} onChange={(val) => selectData(0, val)} options={parserObject[0][0]} />
                    <SelectInput title="月份" defaultValue={getMonth(selectParams[1])[1]} onChange={(val) => selectData(1, val)} options={parserObject[0][1]} />
                    <SelectInput title="天" defaultValue={selectParams[2]} onChange={(val) => selectData(2, val)} options={parserObject[0][2]} />
                </div>
                <Input title="查詢單字" defaultValue={search} onChange={(value, target) => {
                    if (!inputTarget) eleSetTarget(target);
                    setSearch(value);
                }} rightFunctions={[
                    {
                        Icon: MdDelete,
                        active: !!search,
                        onClick: () => {
                            inputTarget.value = "";
                            setSearch("");
                        }
                    },
                    {
                        Icon: MdTune,
                        active: true,
                        onClick: () => {
                            // TODO: Create advance search option
                            createPopUp("搜尋設定", <>
                                <h1>Coming Soon!</h1>
                            </>);
                        }
                    }
                ]} />
            </div>

            <Link to={"/"}><Button Icon={FaChevronLeft}>返回主頁</Button></Link>
            {state.file && <a href={"https://docs.google.com/spreadsheets/d/".concat(state.file)} target="_blank"><Button Icon={FaArrowUpRightFromSquare} isDisable={saveStatus}></Button></a>}
            <Button Icon={FaSave} onClick={saveData} isDisable={saveStatus}></Button>

            <Separate>單字表</Separate>

            <div id="dict">
                <div className="wordList">
                    {
                        !Array.isArray(parserObject[1])
                            ? Object.keys(parserObject[1]).map((key) => {
                                let value = parserObject[1][key];
                                let words = value.map(d => <WordBox key={genRandomString(12)} {...d} onClick={() => showPopUp(d.chinese, d.english, key)} />);
                                return <div key={genRandomString(8)} style={{
                                    width: "100%"
                                }}>
                                    <h1>({key}.) 系列</h1>
                                    <div className="wordList">
                                        {words}
                                    </div>
                                </div>;
                            })
                            : <div className="wordList">
                                {parserObject[1].map(e => <WordBox key={genRandomString(12)} {...e} onClick={() => showPopUp(e.chinese, e.english, e.type)} />)}
                            </div>
                    }
                </div>
            </div>
        </div>;
}