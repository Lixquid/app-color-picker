import { useState } from "preact/hooks";
import { fromHex } from "../../lib/color";
import palettes from "./PaletteSourcePalettes.json";
import { ColorSourceProps } from "./sources";

/** Provides a list of colors drawn from a JSON file. */
export function PaletteSource(props: ColorSourceProps) {
    const [palette, setPalette] = useState<keyof typeof palettes>(() => {
        // Get from session storage, otherwise default to "Oxygen"
        return (
            (sessionStorage.getItem("palette") as keyof typeof palettes) ??
            "Oxygen"
        );
    });

    return (
        <div class="card-body">
            <select
                class="form-select mb-3"
                value={palette}
                onChange={(e) => {
                    sessionStorage.setItem("palette", e.currentTarget.value);
                    return setPalette(
                        e.currentTarget.value as keyof typeof palettes
                    );
                }}
            >
                {Object.keys(palettes).map((palette, i) => (
                    <option key={i}>{palette}</option>
                ))}
            </select>
            {palettes[palette].map((row, i) => (
                <div class="d-flex" key={i}>
                    {row.map((color, j) => (
                        <button
                            class="palettes-color"
                            style={{
                                backgroundColor: `#${color}`,
                            }}
                            onClick={() => props.setColor(fromHex(color)!)}
                            key={j}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
