import { useMemo, useState } from "preact/hooks";
import { toHSL } from "../../lib/color";
import {
    analogous,
    blue,
    complementary,
    green,
    red,
    shades,
    triadic,
} from "../../lib/modify";
import { NumberSliderInput } from "../general/NumberSliderInput";
import { ColorSourceProps } from "./sources";

function ColorEntry(props: ColorSourceProps) {
    return (
        <button
            type="button"
            class="palettes-color"
            style={{
                backgroundColor: `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`,
            }}
            onClick={() => props.setColor(props.color)}
        />
    );
}

/** Provides colors that complement the provided color in a variety of
 * schemes. */
export function ComplementarySource(props: ColorSourceProps) {
    const [strength, setStrength] = useState(1);

    const hsl = useMemo(
        () => toHSL(props.color),
        [props.color.r, props.color.g, props.color.b]
    );

    return (
        <div class="card-body">
            <div class="mb-4">
                <NumberSliderInput
                    label="Strength"
                    min={0}
                    max={5}
                    value={strength}
                    onChange={setStrength}
                />
            </div>

            <div class="h5 mb-2">Analogous</div>
            <div class="d-flex">
                {analogous(hsl, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
            <div class="h5 my-2">Shades</div>
            <div class="d-flex">
                {shades(hsl, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
            <div class="h5 my-2">Triadic</div>
            <div class="d-flex">
                {triadic(hsl, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
            <div class="h5 my-2">Complementary</div>
            <div class="d-flex">
                {complementary(hsl, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
            <div class="h5 my-2">Red Tints</div>
            <div class="d-flex">
                {red(props.color, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
            <div class="h5 my-2">Green Tints</div>
            <div class="d-flex">
                {green(props.color, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
            <div class="h5 my-2">Blue Tints</div>
            <div class="d-flex">
                {blue(props.color, strength).map((color, i) => (
                    <ColorEntry
                        color={color}
                        setColor={props.setColor}
                        key={i}
                    />
                ))}
            </div>
        </div>
    );
}
