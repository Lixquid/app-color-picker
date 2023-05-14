import { useEffect, useMemo, useState } from "preact/hooks";
import { Color, colorFormats, formatObject } from "../lib/color";
import { format } from "../lib/format";
import { setClipboard } from "../lib/util";
import { CustomFormatListItem } from "./CustomFormatListItem";
import { FormatHelpDialog } from "./FormatHelpDialog";

/** Props for the OutputBar component */
interface OutputBarProps {
    /** The color to display */
    color: Color;
    /** The output format to use */
    outputFormat: string;
    /** Function to set the output format */
    setOutputFormat: (format: string) => void;
}

export function OutputBar({
    color,
    outputFormat,
    setOutputFormat,
}: OutputBarProps) {
    const [autoCopy, setAutoCopy] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const formattedColor = useMemo(
        () => format(outputFormat, formatObject(color)),
        [outputFormat, color.r, color.g, color.b]
    );

    // Automatically copy the color when the format or color changes
    useEffect(() => {
        if (autoCopy) {
            setClipboard(formattedColor);
        }
    }, [formattedColor, autoCopy]);

    return (
        <>
            <div class="input-group input-group-lg mb-3">
                <span
                    class="input-group-text"
                    style={{
                        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                    }}
                >
                    &nbsp;
                </span>
                <input
                    type="text"
                    class="form-control"
                    value={formattedColor}
                    readonly
                />
                <button
                    class="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {Object.entries(colorFormats).find(
                        ([_, format]) => format === outputFormat
                    )?.[0] ?? "Custom"}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    {Object.entries(colorFormats).map(([name, format]) => (
                        <li>
                            <a
                                class="dropdown-item"
                                href="#"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setOutputFormat(format);
                                }}
                            >
                                {name}
                            </a>
                        </li>
                    ))}
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <CustomFormatListItem
                        format={outputFormat}
                        setFormat={setOutputFormat}
                        setShowHelp={setShowHelp}
                    />
                </ul>
                <button
                    class="btn btn-success"
                    type="button"
                    onClick={() => {
                        setClipboard(formattedColor);
                    }}
                >
                    Copy
                </button>
                <button
                    class="btn btn-success dropdown-toggle dropdown-toggle-split"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                />
                <ul class="dropdown-menu">
                    <li>
                        <a
                            class="dropdown-item"
                            href="#"
                            onClick={(ev) => {
                                ev.preventDefault();
                                setAutoCopy(!autoCopy);
                            }}
                        >
                            {autoCopy && <i class="bi bi-check me-2" />}
                            Automatically copy
                        </a>
                    </li>
                </ul>
            </div>
            {showHelp && <FormatHelpDialog close={() => setShowHelp(false)} />}
        </>
    );
}
