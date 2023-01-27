import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import all pages
const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Login"));
const Usage = lazy(() => import("../Pages/Usage"));
const Select = lazy(() => import("../Pages/Select"));
const View = lazy(() => import("../Pages/View"));
const ErrorPage = lazy(() => import("../Pages/ErrorPage"));
const Privacy = lazy(() => import("../Pages/Privacy"));
const Functions = lazy(() => import("../Pages/Functions"));

export default () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/select" element={<Select />} />
            <Route path="/view" element={<View />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacy.html" element={<Privacy />} />

            {/* PWA mode functions */}
            <Route path="/functions/*" element={<Functions />} />
        </Routes>
    </BrowserRouter>;
}