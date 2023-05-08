import { useEffect, useState } from "preact/hooks";
import { Color, colorFormats } from "../lib/color";

/** Props for the OutputBar component */
interface OutputBarProps {
    /** The color to display */
    color: Color;
}

/** Sets the contents of the clipboard to the given text using the Clipboard API */
function setClipboard(text: string) {
    navigator.clipboard.writeText(text).catch((err) => {
        console.error("Failed to write to clipboard", err);
    });
}

export function OutputBar({ color }: OutputBarProps) {
    const [outputFormat, setOutputFormat] =
        useState<keyof typeof colorFormats>("Hex");
    const [autoCopy, setAutoCopy] = useState(false);

    // Automatically copy the color when the format or color changes
    useEffect(() => {
        if (autoCopy) {
            setClipboard(colorFormats[outputFormat](color));
        }
    }, [outputFormat, color.r, color.g, color.b]);

    return (
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
                value={colorFormats[outputFormat](color)}
                readonly
            />
            <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {outputFormat}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                {Object.keys(colorFormats).map((format) => (
                    <li>
                        <a
                            class="dropdown-item"
                            href="#"
                            onClick={(ev) => {
                                ev.preventDefault();
                                setOutputFormat(
                                    format as keyof typeof colorFormats
                                );
                            }}
                        >
                            {format}
                        </a>
                    </li>
                ))}
            </ul>
            <button
                class="btn btn-success"
                type="button"
                onClick={() => {
                    setClipboard(colorFormats[outputFormat](color));
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
    );
}