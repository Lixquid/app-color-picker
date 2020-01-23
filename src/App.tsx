import React, { useMemo, useRef, useState } from "react";
import data from "./colorpalettes.json";
import { format } from "./typescript-modules/build/StringUtilities";

interface IColorPickerAppProps {
    onChange?: (output: string) => void;
}

const formats = {
    Hex: "#${r:x2}${g:x2}${b:x2}",
    RGB: "rgb(${r:d0}, ${g:d0}, ${b:d0})",
    RGBA: "rgba(${r:d0}, ${g:d0}, ${b:d0}, 1)"
};

const ColorPickerApp: React.FC = () => {
    const outputEl: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const [selectedPalette, setSelectedPalette] = useState(Object.keys(data)[0]);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("Hex");
    const [customFormat, setCustomFormat] = useState("");

    const output = useMemo(() => {
        if (!selectedColor) {
            return "";
        }
        const color = {
            r: parseInt(selectedColor.substring(0, 2), 16),
            g: parseInt(selectedColor.substring(2, 4), 16),
            b: parseInt(selectedColor.substring(4, 6), 16)
        };
        return format(
            selectedFormat === "Custom" ? customFormat : formats[selectedFormat as keyof typeof formats],
            color
        );
    }, [selectedColor, selectedFormat, customFormat]);

    function setOutputToClipboard() {
        const el = outputEl.current;
        if (!el) {
            return;
        }
        el.focus();
        el.select();
        document.execCommand("copy");
    }

    return (
        <>
            <h1>
                Color Picker
                <a href="https://lixquid.com" className="btn btn-outline-primary float-right">
                    lixquid.com
                </a>
            </h1>

            <div className="input-group input-group-lg mt-5">
                <input
                    type="text"
                    name="output"
                    id="output"
                    className="form-control"
                    value={output}
                    ref={outputEl}
                    readOnly
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {selectedFormat}
                    </button>
                    <div className="dropdown-menu">
                        {Object.keys(formats).map(format => (
                            <a
                                className="dropdown-item"
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    setSelectedFormat(format);
                                }}
                            >
                                {format}
                            </a>
                        ))}
                        <input
                            type="text"
                            className="dropdown-item form-control"
                            placeholder="Custom"
                            value={customFormat}
                            onChange={e => setCustomFormat(e.target.value)}
                            onFocus={() => setSelectedFormat("Custom")}
                        />
                    </div>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-success" onClick={() => outputEl.current && setOutputToClipboard()}>
                        Copy
                    </button>
                </div>
            </div>

            <div className="card mt-3">
                <div className="card-body">
                    <select className="custom-select">
                        {Object.keys(data).map(name => (
                            <option
                                selected={selectedPalette === name}
                                onClick={e => {
                                    e.preventDefault();
                                    setSelectedPalette(name);
                                }}
                            >
                                {name}
                            </option>
                        ))}
                    </select>
                    {Object.keys(data)
                        .filter(name => name === selectedPalette)
                        .map(name => (
                            <div className="px-4 pt-2">
                                {data[name as keyof typeof data].map(cells => (
                                    <div className="row">
                                        {cells.map(color => (
                                            <button
                                                className="btn btn-secondary col m-1"
                                                style={{ backgroundColor: `#${color}`, height: "2rem" }}
                                                onClick={() => setSelectedColor(color)}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default ColorPickerApp;
