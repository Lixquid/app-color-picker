import clsx from "clsx";
import { StateUpdater } from "preact/hooks";
import { fromHex, IColor } from "../../lib/color";
import * as classes from "./HTML5Source.module.styl";

export function HTML5Source({
    color,
    setColor,
}: {
    color: IColor;
    setColor: StateUpdater<IColor>;
}) {
    return (
        <input
            class={clsx("btn btn-secondary w-100", classes.input)}
            type="color"
            value={"#" + color}
            onChange={(e) =>
                setColor(
                    fromHex((e.target as HTMLInputElement)?.value.substring(1))
                )
            }
        />
    );
}
