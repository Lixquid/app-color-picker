import { StateUpdater, useState } from "preact/hooks";
import { fromHex, IColor } from "../../lib/color";
import { objectKeys } from "../../lib/util";
import * as palettes from "./palettes.json";
import * as classes from "./PaletteSource.module.styl";

export function PaletteSource({
    setColor,
}: {
    setColor: StateUpdater<IColor>;
}) {
    const [palette, setPalette] = useState(objectKeys(palettes)[0]);

    return (
        <>
            <select class="form-select mb-3" aria-label="Palette">
                {objectKeys(palettes).map((p) => (
                    <option
                        selected={p === palette}
                        onClick={() => setPalette(p)}
                    >
                        {p}
                    </option>
                ))}
            </select>
            {palettes[palette].map((r) => (
                <div class="d-flex">
                    {r.map((c) => (
                        <button
                            type="button"
                            class={classes.item}
                            style={{ backgroundColor: "#" + c }}
                            onClick={() => setColor(fromHex(c))}
                        />
                    ))}
                </div>
            ))}
        </>
    );
}
