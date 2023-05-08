import { useMemo } from "preact/hooks";
import { Color, toHex } from "../../lib/color";

/** Props for the PreviewPane component */
interface PreviewPaneProps {
    /** The color to display */
    color: Color;
}

/** A pane that displays the current color in a variety of situations */
export function PreviewPane(props: PreviewPaneProps) {
    const hex = useMemo(
        () => toHex(props.color),
        [props.color.r, props.color.g, props.color.b]
    );

    return (
        <div class="card mt-3">
            <div class="card-header">Preview</div>
            <div class="card-body">
                <div class="d-flex">
                    <div class="flex-grow-1 text-center bg-dark">
                        <div class="h1 my-3" style={{ color: hex }}>
                            Preview
                        </div>
                    </div>
                    <div class="flex-grow-1 text-center bg-light">
                        <div class="h1 my-3" style={{ color: hex }}>
                            Preview
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <div
                        class="flex-grow-1 text-center text-dark"
                        style={{ backgroundColor: hex }}
                    >
                        <div class="h1 my-3">Preview</div>
                    </div>
                    <div
                        class="flex-grow-1 text-center text-light"
                        style={{ backgroundColor: hex }}
                    >
                        <div class="h1 my-3">Preview</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
