import { useEffect, useState } from "preact/hooks";
import { OutputBar } from "./components/OutputBar";
import { HistoryPane } from "./components/panes/HistoryPane";
import { PreviewPane } from "./components/panes/PreviewPane";
import { colorSources } from "./components/sources/sources";
import { Color, colorEquals, colorFormats } from "./lib/color";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
    const html = document.querySelector("html");
    if (html !== null) {
        html.dataset.bsTheme =
            html.dataset.bsTheme === "dark" ? "light" : "dark";
    }
}

export function App() {
    const [color, setColor] = useState<Color>({ r: 0, g: 87, b: 174 });
    const [colorSource, setColorSource] =
        useState<keyof typeof colorSources>("Input");
    const [historyOpen, setHistoryOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [history, setHistory] = useState<Color[]>([color]);
    const [outputFormat, setOutputFormat] =
        useState<keyof typeof colorFormats>("Hex");

    const ColorSourceComponent = colorSources[colorSource];

    // Add the current color to the history if it's not already there,
    // otherwise move it to the front.
    useEffect(() => {
        setHistory((history) => {
            if (!colorEquals(history[0], color)) {
                return [
                    color,
                    ...history.filter((c) => !colorEquals(c, color)),
                ];
            }
            return history;
        });
    }, [color.r, color.g, color.b, setHistory]);

    return (
        <div class="container mx-auto my-5">
            <div class="d-flex justify-content-between align-items-center flex-wrap mb-5">
                <h1>Color Picker</h1>
                <div>
                    <button
                        class="btn btn-outline-secondary me-2"
                        onClick={toggleDarkMode}
                        title="Toggle dark mode"
                    >
                        <i class="bi bi-moon-fill" />
                    </button>
                    <a
                        href="https://lixquid.com"
                        class="btn btn-outline-primary"
                    >
                        <i class="bi bi-box-arrow-up-right me-2" />
                        lixquid.com
                    </a>
                </div>
            </div>
            <OutputBar
                color={color}
                outputFormat={outputFormat}
                setOutputFormat={setOutputFormat}
            />
            <div>
                <button
                    class={`btn btn-secondary dropdown-toggle me-2 ${
                        historyOpen ? "active" : ""
                    }`}
                    onClick={() => setHistoryOpen(!historyOpen)}
                    aria-pressed={historyOpen ? "true" : "false"}
                    aria-expanded={historyOpen ? "true" : "false"}
                >
                    History
                </button>
                <button
                    class={`btn btn-secondary dropdown-toggle ${
                        previewOpen ? "active" : ""
                    }`}
                    onClick={() => setPreviewOpen(!previewOpen)}
                    aria-pressed={previewOpen ? "true" : "false"}
                    aria-expanded={previewOpen ? "true" : "false"}
                >
                    Preview
                </button>
            </div>
            {historyOpen && (
                <HistoryPane
                    history={history}
                    setHistory={setHistory}
                    setColor={setColor}
                    outputFormat={outputFormat}
                />
            )}
            {previewOpen && <PreviewPane color={color} />}
            <div class="card mt-5">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        {Object.keys(colorSources).map((source, i) => (
                            <li class="nav-item" key={i}>
                                <button
                                    class={`nav-link ${
                                        source === colorSource ? "active" : ""
                                    }`}
                                    onClick={() =>
                                        setColorSource(
                                            source as keyof typeof colorSources
                                        )
                                    }
                                    aria-current={
                                        source === colorSource
                                            ? "true"
                                            : "false"
                                    }
                                >
                                    {source}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <ColorSourceComponent setColor={setColor} color={color} />
            </div>
        </div>
    );
}
