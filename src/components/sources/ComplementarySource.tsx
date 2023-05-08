import { useMemo } from "preact/hooks";
import { fromHSL, toHSL } from "../../lib/color";
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
    const hsl = useMemo(
        () => toHSL(props.color),
        [props.color.r, props.color.g, props.color.b]
    );
    console.log(hsl);

    return (
        <div class="card-body">
            <div class="h5 mb-2">Analogous</div>
            <div class="d-flex">
                <ColorEntry
                    color={fromHSL([hsl[0] + 32, hsl[1], hsl[2] + 0.05])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0] + 16, hsl[1], hsl[2] + 0.1])}
                    setColor={props.setColor}
                />
                <ColorEntry color={props.color} setColor={props.setColor} />
                <ColorEntry
                    color={fromHSL([hsl[0] - 16, hsl[1], hsl[2] + 0.1])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0] - 32, hsl[1], hsl[2] + 0.05])}
                    setColor={props.setColor}
                />
            </div>
            <div class="h5 my-2">Shades</div>
            <div class="d-flex">
                <ColorEntry
                    color={fromHSL([hsl[0], hsl[1], hsl[2] + 0.2])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0], hsl[1], hsl[2] + 0.1])}
                    setColor={props.setColor}
                />
                <ColorEntry color={props.color} setColor={props.setColor} />
                <ColorEntry
                    color={fromHSL([hsl[0], hsl[1], hsl[2] - 0.1])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0], hsl[1], hsl[2] - 0.2])}
                    setColor={props.setColor}
                />
            </div>
            <div class="h5 my-2">Triadic</div>
            <div class="d-flex">
                <ColorEntry
                    color={fromHSL([hsl[0] + 120, hsl[1], hsl[2]])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0] + 60, hsl[1], hsl[2]])}
                    setColor={props.setColor}
                />
                <ColorEntry color={props.color} setColor={props.setColor} />
                <ColorEntry
                    color={fromHSL([hsl[0] - 60, hsl[1], hsl[2]])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0] - 120, hsl[1], hsl[2]])}
                    setColor={props.setColor}
                />
            </div>
            <div class="h5 my-2">Complementary</div>
            <div class="d-flex">
                <ColorEntry
                    color={fromHSL([hsl[0], hsl[1], hsl[2] + 0.1])}
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0], hsl[1], hsl[2] - 0.1])}
                    setColor={props.setColor}
                />
                <ColorEntry color={props.color} setColor={props.setColor} />
                <ColorEntry
                    color={
                        hsl[2] < 0.5
                            ? fromHSL([hsl[0] + 180, hsl[1], hsl[2] + 0.1])
                            : fromHSL([hsl[0] + 180, hsl[1], hsl[2] - 0.1])
                    }
                    setColor={props.setColor}
                />
                <ColorEntry
                    color={fromHSL([hsl[0] + 180, hsl[1], hsl[2]])}
                    setColor={props.setColor}
                />
            </div>
        </div>
    );
}
