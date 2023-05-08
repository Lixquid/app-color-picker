import { useState } from "preact/hooks";
import { OutputBar } from "./components/OutputBar";
import { HistoryPane } from "./components/panes/HistoryPane";
import { PreviewPane } from "./components/panes/PreviewPane";
import { colorSources } from "./components/sources/sources";
import { Color } from "./lib/color";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
    const html = document.querySelector("html");
    if (html !== null) {
        html.dataset.bsTheme =
            html.dataset.bsTheme === "dark" ? "light" : "dark";
    }
}

export function App() {
    const [color, setColor] = useState<Color>({ r: 0, g: 0, b: 0 });
    const [colorSource, setColorSource] =
        useState<keyof typeof colorSources>("Palettes");
    const [historyOpen, setHistoryOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const ColorSourceComponent = colorSources[colorSource];

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
            <OutputBar color={color} />
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
            {historyOpen && <HistoryPane color={color} setColor={setColor} />}
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
