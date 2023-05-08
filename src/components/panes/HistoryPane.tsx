import { Color, toHex } from "../../lib/color";

/** Props for the HistoryPane component */
interface HistoryPaneProps {
    /** The history to display */
    history: Color[];
    /** Function to set the color */
    setColor: (color: Color) => void;
    /** Function to set the history */
    setHistory: (history: Color[]) => void;
}

/** A pane that displays the history of colors */
export function HistoryPane(props: HistoryPaneProps) {
    return (
        <div class="card mt-3">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <span>History</span>
                    <button
                        class="btn btn-link btn-sm text-danger"
                        onClick={() => props.setHistory([])}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div class="card-body">
                {props.history.map((color, i) => (
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
