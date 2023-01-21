import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

// import Menu from "./Menu";
// import Exam from "./Exam";
// import Feed from "./Feed";
const Menu = lazy(() => import("./Menu"));
const Exam = lazy(() => import("./Exam"));
const Feed = lazy(() => import("./Feed"));

export default () => {
    return <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/feed" element={<Feed />} />
    </Routes>;
}