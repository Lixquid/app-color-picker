import { useMemo } from "preact/hooks";
import { fromHSL, fromHex, toHSL, toHex } from "../../lib/color";
import { NumberSliderInput } from "../general/NumberSliderInput";
import { ColorSourceProps } from "./sources";

/** Provides colours directly input by the user. */
export function InputSource(props: ColorSourceProps) {
    const hsl = useMemo(
        () => toHSL(props.color),
        [props.color.r, props.color.g, props.color.b]
    );

    return (
        <div class="card-body">
            <div class="h4 mb-2">RGB</div>
            <NumberSliderInput
                label="Red"
                min={0}
                max={255}
                value={Math.round(props.color.r)}
                onChange={(r) =>
                    props.setColor({ r, g: props.color.g, b: props.color.b })
                }
                step={1}
            />
            <NumberSliderInput
                label="Green"
                min={0}
                max={255}
                value={Math.round(props.color.g)}
                onChange={(g) =>
                    props.setColor({ r: props.color.r, g, b: props.color.b })
                }
                step={1}
            />
            <NumberSliderInput
                label="Blue"
                min={0}
                max={255}
                value={Math.round(props.color.b)}
                onChange={(b) =>
                    props.setColor({ r: props.color.r, g: props.color.g, b })
                }
                step={1}
            />

            <div class="h4 mt-4 mb-2">Hex</div>
            <input
                type="text"
                class="form-control"
                value={toHex(props.color)}
                onChange={(e) => {
                    const color = fromHex((e.target as HTMLInputElement).value);
                    if (color) props.setColor(color);
                }}
            />

            <div class="h4 mt-4 mb-2">HSL</div>
            <NumberSliderInput
                label="Hue"
                min={0}
                max={360}
                value={Math.round(hsl[0])}
                onChange={(h) => props.setColor(fromHSL([h, hsl[1], hsl[2]]))}
                step={1}
            />
            <NumberSliderInput
                label="Saturation"
                min={0}
                max={100}
                value={Math.round(hsl[1] * 100)}
                onChange={(s) =>
                    props.setColor(fromHSL([hsl[0], s / 100, hsl[2]]))
                }
                step={1}
            />
            <NumberSliderInput
                label="Lightness"
                min={0}
                max={100}
                value={Math.round(hsl[2] * 100)}
                onChange={(l) =>
                    props.setColor(fromHSL([hsl[0], hsl[1], l / 100]))
                }
                step={1}
            />
        </div>
    );
}
