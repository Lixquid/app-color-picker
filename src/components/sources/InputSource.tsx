import { useMemo } from "preact/hooks";
import { fromHSL, fromHex, toHSL, toHex } from "../../lib/color";
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
            <div class="row mb-1 align-items-center">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-text">Red</span>
                        <input
                            type="number"
                            class="form-control"
                            value={props.color.r}
                            onChange={(e) =>
                                props.setColor({
                                    r: parseInt(
                                        (e.target as HTMLInputElement).value
                                    ),
                                    g: props.color.g,
                                    b: props.color.b,
                                })
                            }
                        />
                    </div>
                </div>
                <div class="col-sm-9">
                    <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="255"
                        step="1"
                        value={props.color.r}
                        onChange={(e) =>
                            props.setColor({
                                r: parseInt(
                                    (e.target as HTMLInputElement).value
                                ),
                                g: props.color.g,
                                b: props.color.b,
                            })
                        }
                    />
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-text">Green</span>
                        <input
                            type="number"
                            class="form-control"
                            value={props.color.g}
                            onChange={(e) =>
                                props.setColor({
                                    r: props.color.r,
                                    g: parseInt(
                                        (e.target as HTMLInputElement).value
                                    ),
                                    b: props.color.b,
                                })
                            }
                        />
                    </div>
                </div>
                <div class="col-sm-9">
                    <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="255"
                        step="1"
                        value={props.color.g}
                        onChange={(e) =>
                            props.setColor({
                                r: props.color.r,
                                g: parseInt(
                                    (e.target as HTMLInputElement).value
                                ),
                                b: props.color.b,
                            })
                        }
                    />
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-text">Blue</span>
                        <input
                            type="number"
                            class="form-control"
                            value={props.color.b}
                            onChange={(e) =>
                                props.setColor({
                                    r: props.color.r,
                                    g: props.color.g,
                                    b: parseInt(
                                        (e.target as HTMLInputElement).value
                                    ),
                                })
                            }
                        />
                    </div>
                </div>
                <div class="col-sm-9">
                    <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="255"
                        step="1"
                        value={props.color.b}
                        onChange={(e) =>
                            props.setColor({
                                r: props.color.r,
                                g: props.color.g,
                                b: parseInt(
                                    (e.target as HTMLInputElement).value
                                ),
                            })
                        }
                    />
                </div>
            </div>

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
            <div class="row mb-1 align-items-center">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-text">Hue</span>
                        <input
                            type="number"
                            class="form-control"
                            value={Math.round(hsl[0])}
                            min="0"
                            max="360"
                            step="1"
                            onChange={(e) =>
                                props.setColor(
                                    fromHSL([
                                        parseInt(
                                            (e.target as HTMLInputElement).value
                                        ),
                                        hsl[1],
                                        hsl[2],
                                    ])
                                )
                            }
                        />
                    </div>
                </div>
                <div class="col-sm-9">
                    <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="360"
                        step="1"
                        value={Math.round(hsl[0])}
                        onChange={(e) =>
                            props.setColor(
                                fromHSL([
                                    parseInt(
                                        (e.target as HTMLInputElement).value
                                    ),
                                    hsl[1],
                                    hsl[2],
                                ])
                            )
                        }
                    />
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-text">Saturation</span>
                        <input
                            type="number"
                            class="form-control"
                            value={Math.round(hsl[1] * 100)}
                            min="0"
                            max="100"
                            step="1"
                            onChange={(e) =>
                                props.setColor(
                                    fromHSL([
                                        hsl[0],
                                        parseInt(
                                            (e.target as HTMLInputElement).value
                                        ) / 100,
                                        hsl[2],
                                    ])
                                )
                            }
                        />
                    </div>
                </div>
                <div class="col-sm-9">
                    <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="100"
                        step="1"
                        value={Math.round(hsl[1] * 100)}
                        onChange={(e) =>
                            props.setColor(
                                fromHSL([
                                    hsl[0],
                                    parseInt(
                                        (e.target as HTMLInputElement).value
                                    ) / 100,
                                    hsl[2],
                                ])
                            )
                        }
                    />
                </div>
            </div>
            <div class="row mb-1 align-items-center">
                <div class="col-sm-3">
                    <div class="input-group">
                        <span class="input-group-text">Lightness</span>
                        <input
                            type="number"
                            class="form-control"
                            value={Math.round(hsl[2] * 100)}
                            min="0"
                            max="100"
                            step="1"
                            onChange={(e) =>
                                props.setColor(
                                    fromHSL([
                                        hsl[0],
                                        hsl[1],
                                        parseInt(
                                            (e.target as HTMLInputElement).value
                                        ) / 100,
                                    ])
                                )
                            }
                        />
                    </div>
                </div>
                <div class="col-sm-9">
                    <input
                        type="range"
                        class="form-range"
                        min="0"
                        max="100"
                        step="1"
                        value={Math.round(hsl[2] * 100)}
                        onChange={(e) =>
                            props.setColor(
                                fromHSL([
                                    hsl[0],
                                    hsl[1],
                                    parseInt(
                                        (e.target as HTMLInputElement).value
                                    ) / 100,
                                ])
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
}
