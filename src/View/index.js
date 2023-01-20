import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { MdNorthEast } from "react-icons/md";

import { getSheet, getSheetsList } from "../Google/APIs";
import { errorShow, Loading, genRandomString, showPopUp as createPopUp, getMonth } from "../util";
import Button from "../Button";
import Input from "../Input";
import Separate from "../Separate";
import SelectInput from "../SelectInput";
import WordBox from "./WordBox";

import "./index.css";

export default () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState({
        init: false
    });
    const [loadStatus, setLoadStatus] = useState(undefined);
    const [search, setSearch] = useState("");
    const [selectParams, setSelectParams] = useState({
        year: 0,
        month: "",
        day: 0
    });
    const [alert, setAlert] = useState(<></>);

    function selectData(type, value) {
        if (type === 0) setSelectParams({
            year: value,
            month: Object.keys(data.formatedData[value])[0],
            day: Object.keys(data.formatedData[value][Object.keys(data.formatedData[value])[0]])[0]
        });
        if (type === 1) setSelectParams({
            ...selectParams,
            month: getMonth(value)[0],
            day: Object.keys(data.formatedData[selectParams.year][getMonth(value)[0]])[0]
        });
        if (type === 2) setSelectParams({
            ...selectParams,
            day: value
        });
    }

    function showPopUp(chinese, english, type) {
        createPopUp("詳細資訊", <>
            <div>
                <h1>{english} ({type}.)</h1>
                <h3>中文意思: {chinese}</h3>
            </div>
            <div>
                <a target="_blank" href={"https://www.google.com/search?q=" + english}><MdNorthEast fontSize={23} />於 <span className="special">Google</span> 上查詢「{english}」的意思</a>
                <a target="_blank" href={"https://translate.google.com.tw/?hl=zh-TW&sl=en&tl=zh-TW&op=translate&text=" + english}><MdNorthEast fontSize={23} />於 <span className="special">Google 翻譯</span> 上查詢「{english}」的意思</a>
                <a target="_blank" href={"https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B9%81%E9%AB%94/" + english}><MdNorthEast fontSize={23} />於 <span className="special">Cambridge Dictionary</span> 上查詢「{english}」的意思</a>
            </div>
        </>);
    }

    useEffect(() => {
        let FILE;

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

            let matches = [false, 0];

            let nType = [];

            try {
                for (let i = 0; i < sheetData.result.values.length; i++) {
                    let data = sheetData.result.values.shift();
                    let l = data;
                    if (l[0]) {
                        let s = l[0].split(" ");

                        bfM = m;
                        m = s[0];
                        d = Number(s[1]);
                        y = m !== "December" && bfM === "December" ? ++y : y;

                        if (m == getMonth(date.getMonth() + 1)[0] && d === date.getDate()) {
                            matches[0] = true;
                            matches[1] = y;
                        }

                        if (!formatedData[y]) formatedData[y] = {};
                        if (!formatedData[y][m]) formatedData[y][m] = {};

                        nType = [l[1], l[4], l[7]].map(text => text.replace(/\((\w*)\.\)/gm, "$1"));
                        
                        formatedData[y][m][d] = {
                            [nType[0]]: [],
                            [nType[1]]: [],
                            [nType[2]]: []
                        };
                    }

                    for (let i = 0; i < 3; i++) {
                        wlist.push({
                            chinese: l[3 + 3 * i],
                            english: l[2 + 3 * i],
                            year: y,
                            month: m,
                            day: d,
                            type: nType[i]
                        })
                        formatedData[y][m][d][nType[i]].push({
                            chinese: l[3 + 3 * i],
                            english: l[2 + 3 * i]
                        });
                    }
                }

                setLoadStatus("載入");
                setData({ init: true, formatedData, wlist });

                setSelectParams({
                    year: matches[0] ? matches[1] : Object.keys(formatedData)[0],
                    month: matches[0] ? getMonth(date.getMonth() + 1)[0] : Object.keys(formatedData[Object.keys(formatedData)[0]])[0],
                    day: matches[0] ? date.getDate() : Object.keys(formatedData[Object.keys(formatedData)[0]][Object.keys(formatedData[Object.keys(formatedData)[0]])[0]])[0]
                });
            } catch (err) {
                console.error("Catch Error:", err);
                errorShow("您可能選擇到錯誤的檔案，本系統無法解析該Sheet，請返回然後再試一次。", navigate);
                return;
            }
        }

        a();
    }, []);

    let parserObject = {
        options: {
            year: [],
            month: [],
            day: []
        },
        display: undefined
    }

    if (data.init) {
        parserObject.options.year = Object.keys(data.formatedData);
        parserObject.options.month = Object.keys(data.formatedData[selectParams.year]).map(e => getMonth(e)[1]);
        parserObject.options.day = Object.keys(data.formatedData[selectParams.year][Object.keys(data.formatedData[selectParams.year])[0]]);

        if (!search.trim()) parserObject.display = data.formatedData[selectParams.year][selectParams.month][selectParams.day];
        else parserObject.display = data.wlist.filter(e => e.english && e.english.includes(search.trim().toLowerCase()) || e.chinese && e.chinese.includes(search.trim()));
    }

    return !data.init
        ? <Loading extra={loadStatus} />
        : <div>
            {alert}
            <div className="function">
                <SelectInput title="年分" defaultValue={selectParams.year} onChange={(val) => selectData(0, val)} options={parserObject.options.year} />
                <SelectInput title="月份" defaultValue={getMonth(selectParams.month)[1]} onChange={(val) => selectData(1, val)} options={parserObject.options.month} />
                <SelectInput title="天" defaultValue={selectParams.day} onChange={(val) => selectData(2, val)} options={parserObject.options.day} />
                <Input title="查詢單字" defaultValue={search} onChange={setSearch} />
            </div>

            <Link to={"/"}><Button Icon={FaChevronLeft}>返回主頁</Button></Link>

            <Separate>單字表</Separate>

            <div id="dict">
                <div className="wordList">
                    {
                        !Array.isArray(parserObject.display)
                            ? Object.keys(parserObject.display).map((key) => {
                                let value = parserObject.display[key];
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
                                {parserObject.display.map(e => <WordBox key={genRandomString(12)} {...e} onClick={() => showPopUp(e.chinese, e.english, e.type)} />)}
                            </div>
                    }
                </div>
            </div>
        </div>;
}