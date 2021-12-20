import clsx from "clsx";
import { StateUpdater, useEffect, useRef } from "preact/hooks";
import { toFormat, toHex } from "../../lib/color";
import { useForceUpdate } from "../../lib/hooks";
import { IColor } from "../../lib/types";
import * as classes from "./HistoryPane.module.styl";

export function HistoryPane({
    color,
    setColor,
    format,
    visible,
}: {
    color: IColor;
    setColor: StateUpdater<IColor>;
    format: string;
    visible: boolean;
}) {
    const history = useRef<IColor[]>([]);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        history.current.unshift(color);
        forceUpdate();
    }, [color.r, color.g, color.b]);

    if (!visible) {
        return null;
    }

    return (
        <div class="card mb-3">
            <div class="card-header">
                History
                <a
                    class="float-end text-danger"
                    href="#"
                    onClick={() => {
                        history.current = [];
                        forceUpdate();
                    }}
                >
                    Clear All
                </a>
            </div>
            <div class={clsx("card-body", classes.pane)}>
                {history.current.map((c) => (
                    <button
                        class={classes.item}
                        style={{ backgroundColor: toHex(c) }}
                        title={toFormat(c, format)}
                        onClick={() => setColor(c)}
                    />
                ))}
            </div>
        </div>
    );
}
