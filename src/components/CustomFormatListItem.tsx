import { useEffect, useState } from "preact/hooks";
import { formatObject } from "../lib/color";
import { FormatError, format } from "../lib/format";

/** Props for the CustomFormatListItem component */
interface CustomFormatListItemProps {
    /** The format to display */
    format: string;
    /** Function to set the format */
    setFormat: (format: string) => void;
    /** Function to set the help dialog visibility */
    setShowHelp: (show: boolean) => void;
}

const black = formatObject({ r: 0, g: 0, b: 0 });

/** A list item that displays a custom format */
export function CustomFormatListItem({
    format: currentFormat,
    setFormat,
    setShowHelp,
}: CustomFormatListItemProps) {
    const [text, setText] = useState(currentFormat);
    const [error, setError] = useState<string | null>(null);

    // Update the text when the format changes externally
    useEffect(() => {
        setText(currentFormat);
    }, [currentFormat, setText]);

    return (
        <li class="px-2" onClick={(ev) => ev.stopPropagation()}>
            <label
                for="custom-format"
                class="dropdown-header d-flex justify-content-between align-items-center"
            >
                <span>Custom</span>
                <button
                    class="btn btn-sm btn-link text-info p-0"
                    onClick={() => setShowHelp(true)}
                >
                    <i class="bi bi-question-circle text-info" />
                </button>
            </label>
            <input
                type="text"
                class={`form-control form-control-sm ${
                    error ? "is-invalid" : ""
                }`}
                id="custom-format"
                value={text}
                onChange={(ev) => {
                    const newFormat = ev.currentTarget.value;
                    setText(newFormat);
                    try {
                        // Validate the format
                        format(newFormat, black);
                        setError(null);
                        setFormat(newFormat);
                    } catch (e: unknown) {
                        if (e instanceof FormatError) {
                            setError(e.message);
                        } else {
                            throw e;
                        }
                    }
                }}
            />
            {error && <div class="invalid-feedback">{error}</div>}
        </li>
    );
}
