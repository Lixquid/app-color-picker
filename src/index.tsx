import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import ReactDOM from "react-dom";
import ColorPickerApp from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <div className="mx-auto my-5 container">
        <ColorPickerApp />
    </div>,
    document.getElementById("root")
);
serviceWorker.register();
