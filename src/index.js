/*
 * Zark's Dictionary
 * Created by: Muisnow <muisnowbusiness@gmail.com>
 * 
 * Copyright 2023 The HLHSInfo Authors.
 * Copyright 2023 The Zark's Dictionary Developers.
 * Copyright 2023 sanZi Network and Muisnow.
 * 
 * Homepage: https://zarksdict.hlhsinfo.ml
 * Git Repository: https://github.com/TWMSSS/zarksdict
 * 
 **/

import ReactDOM from "react-dom/client";
import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./index.css";
import "./imports.css";

ReactDOM.createRoot(document.querySelector("#app")).render(<App />);
serviceWorkerRegistration.register();