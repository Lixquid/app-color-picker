import clsx from "clsx";
import { useMemo, useState } from "preact/hooks";
import { IColor, toFormat } from "../lib/color";
import { objectKeys } from "../lib/util";
import { CopyDropdown } from "./CopyDropdown";
import { FormatDropdown } from "./FormatDropdown";
import { HistoryPane } from "./panes/HistoryPane";
import { PreviewPane } from "./panes/PreviewPane";
import { HTML5Source } from "./sources/HTML5Source";
import { ImageSource } from "./sources/ImageSource";
import { PaletteSource } from "./sources/PaletteSource";

const sources = {
    Palette: PaletteSource,
    "HTML 5": HTML5Source,
    Image: ImageSource,
};

export function Main() {
    const [color, setColor] = useState<IColor>({ r: 0, g: 0, b: 0 });
    const [format, setFormat] = useState("Hex");
    const [showPreview, setShowPreview] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [source, setSource] = useState(objectKeys(sources)[0]);

    const colorOutput = useMemo(() => toFormat(color, format), [color, format]);
    const ActiveSource = useMemo(() => sources[source], [source]);

    return (
        <div class="container mx-auto my-5">
            <h1 class="mb-5">
                Color Picker
                <a
                    class="btn btn-outline-primary float-end"
                    href="https://lixquid.com"
                >
                    lixquid.com
                </a>
            </h1>
            <div class="input-group input-group-lg mb-3">
                <input
                    type="text"
                    class="form-control"
                    readonly
                    value={colorOutput}
                />
                <FormatDropdown format={format} setFormat={setFormat} />
                <CopyDropdown str={colorOutput} />
            </div>
            <div class="mb-3">
                <button
                    class={clsx(
                        "btn btn-secondary me-3",
                        showPreview && "active"
                    )}
                    aria-pressed={showPreview}
                    onClick={() => setShowPreview(!showPreview)}
                >
                    {showPreview ? "Hide" : "Show"} Preview
                </button>
                <button
                    class={clsx("btn btn-secondary", showHistory && "active")}
                    aria-pressed={showHistory}
                    onClick={() => setShowHistory(!showHistory)}
                >
                    {showHistory ? "Hide" : "Show"} History
                </button>
            </div>

            {showPreview && <PreviewPane color={color} />}
            <HistoryPane
                color={color}
                setColor={setColor}
                format={format}
                visible={showHistory}
            />

            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        {objectKeys(sources).map((s) => (
                            <li class="nav-item">
                                <a
                                    class={clsx(
                                        "nav-link",
                                        s === source && "active"
                                    )}
                                    aria-current={s === source}
                                    href="#"
                                    onClick={(e) => {
                                        setSource(s);
                                        e.preventDefault();
                                    }}
                                >
                                    {s}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div class="card-body">
                    <ActiveSource color={color} setColor={setColor} />
                </div>
            </div>
        </div>
    );
}
