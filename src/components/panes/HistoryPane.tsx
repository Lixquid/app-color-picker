import { useEffect, useState } from "preact/hooks";
import { Color, toHex } from "../../lib/color";

/** Props for the HistoryPane component */
interface HistoryPaneProps {
    /** Updated when the color is changed */
    color: Color;
    /** Function to set the color */
    setColor: (color: Color) => void;
}

/** A pane that displays the history of colors */
export function HistoryPane(props: HistoryPaneProps) {
    const [history, setHistory] = useState<Color[]>([]);

    // Add the color to the history
    useEffect(() => {
        setHistory([props.color, ...history]);
    }, [props.color, setHistory]);

    return (
        <div class="card mt-3">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <span>History</span>
                    <button
                        class="btn btn-link btn-sm text-danger"
                        onClick={() => setHistory([])}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div class="card-body">
                {history.map((color, i) => (
                    <button
                        class="history-color"
                        style={{ backgroundColor: toHex(color) }}
                        onClick={() => props.setColor(color)}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
}
