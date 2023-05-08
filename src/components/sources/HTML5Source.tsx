import { fromHex, toHex } from "../../lib/color";
import { ColorSourceProps } from "./sources";

/** Exposes the built-in HTML5 color input as a source. */
export function HTML5Source(props: ColorSourceProps) {
    return (
        <div class="card-body">
            <input
                type="color"
                class="form-control form-control-color html5-input"
                value={toHex(props.color)}
                onChange={(e) => {
                    const color = fromHex(e.currentTarget.value);
                    if (color !== undefined) {
                        props.setColor(color);
                    }
                }}
            />
        </div>
    );
}
