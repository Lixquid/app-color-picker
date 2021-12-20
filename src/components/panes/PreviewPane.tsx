import { useMemo } from "preact/hooks";
import { IColor, toHex } from "../../lib/color";

export function PreviewPane({ color }: { color: IColor }) {
    const hex = useMemo(() => toHex(color), [color]);

    return (
        <div class="card mb-3">
            <div class="card-header">Preview</div>
            <div class="card-body text-center px-5">
                <div class="row">
                    <div class="col text-dark" style={{ backgroundColor: hex }}>
                        <div class="h1 py-3">Example</div>
                    </div>
                    <div
                        class="col text-light"
                        style={{ backgroundColor: hex }}
                    >
                        <div class="h1 py-3">Example</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col bg-dark" style={{ color: hex }}>
                        <div class="h1 py-3">Example</div>
                    </div>
                    <div class="col bg-light" style={{ color: hex }}>
                        <div class="h1 py-3">Example</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
