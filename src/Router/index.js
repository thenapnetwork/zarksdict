import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import all pages
const Home = lazy(() => import("../Home"));
const Login = lazy(() => import("../Login"));
const Usage = lazy(() => import("../Usage"));
const Select = lazy(() => import("../Select"));
const View = lazy(() => import("../View"));
const ErrorPage = lazy(() => import("../ErrorPage"));
const Privacy = lazy(() => import("../Privacy"));
const Functions = lazy(() => import("../Functions"));

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