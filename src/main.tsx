import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store/index";
import { Provider } from "react-redux";

import "./index.scss";
import Home from "./components/home/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Home />
        </Provider>
    </React.StrictMode>
);
