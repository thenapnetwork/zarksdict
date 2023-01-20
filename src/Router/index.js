import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import all pages
import Home from "../Home";
import Login from "../Login";
import Usage from "../Usage";
import Select from "../Select";
import View from "../View";
import ErrorPage from "../ErrorPage";
import Privacy from "../Privacy";

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
        </Routes>
    </BrowserRouter>;
}