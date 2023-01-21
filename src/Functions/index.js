import { Route, Routes } from "react-router-dom";

import Menu from "./Menu";
import Exam from "./Exam";

export default () => {
    return <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/exam" element={<Exam />} />
    </Routes>;
}