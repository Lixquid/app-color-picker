function formatFragment(
    value: number,
    formatter: string,
    padding: number,
    zeroPad: boolean
): string {
    let output: string;
    switch (formatter) {
        case "d":
        case "i":
            output = Math.trunc(value).toString();
            break;
        case "f":
            output = value.toString();
            break;
        case "e":
            output = value.toExponential();
            break;
        case "o":
            output = Math.trunc(value).toString(8);
            break;
        case "x":
            output = Math.trunc(value).toString(16);
            break;
        case "X":
            output = Math.trunc(value).toString(16).toUpperCase();
            break;
        default:
            throw new Error(`Invalid format specified: ${formatter}`);
    }

    return output.padStart(padding, zeroPad ? "0" : " ");
}

/** Formats a string using an object and placeholders of the form `{key}`.
 *
 * Placeholders can have a format specifier of the form `{key:specifier}`.
 *
 * The following specifiers are supported:
 * - `d` / `i` - integer (truncate float)
 * - `f` - float
 * - `e` - float (scientific notation)
 * - `o` - octal (truncate float)
 * - `x` - hexadecimal (lowercase)
 * - `X` - hexadecimal (uppercase)
 *
 * If the specifier is preceded by a number, it is used to specify the number
 * of zeros to left-pad the number to.
 * @param str The string to format.
 * @param obj The object to use for formatting.
 * @returns The formatted string.
 * @throws {@link PlaceholderNotFoundError} if a placeholder is not found in the object.
 * @throws {@link InvalidFormatSpecifierError} if an invalid format specifier is used.
 */
export function format(str: string, obj: Record<string, unknown>): string {
    // Look for placeholders
    const regex = /{([^:}]+)(?::([^}]+))?}/g;

    // Replace placeholders
    return str.replace(
        regex,
        (_, key: string, specifier: string | undefined) => {
            if (obj[key] === undefined) {
                throw new PlaceholderNotFoundError(key);
            }

            switch (typeof obj[key]) {
                case "number":
                    let formatter = "f";
                    let padding = 0;
                    let zeroPad = false;
                    if (specifier !== undefined) {
                        const m = specifier.match(/^(0)?(\d+)?([difoxXe])$/);
                        if (m === null) {
                            throw new InvalidFormatSpecifierError(
                                key,
                                specifier
                            );
                        }
                        if (m[1] !== undefined) {
                            zeroPad = true;
                        }
                        if (m[2] !== undefined) {
                            padding = parseInt(m[2], 10);
                        }
                        formatter = m[3]!;
                    }

                    return formatFragment(
                        obj[key] as number,
                        formatter,
                        padding,
                        zeroPad
                    );
                default:
                    return String(obj[key]);
            }
        }
    );
}

/** Superclass for all errors thrown by the {@link format} function. */
export class FormatError extends Error {
    constructor(message: string) {
        super(message);
    }
}

/** Error thrown when a placeholder is not found in the object. */
export class PlaceholderNotFoundError extends FormatError {
    constructor(placeholder: string) {
        super(`Placeholder not found: ${placeholder}`);
    }
}

/** Error thrown when an invalid format specifier is used. */
export class InvalidFormatSpecifierError extends FormatError {
    constructor(placeholder: string, specifier: string) {
        super(`Invalid format specifier: ${specifier} in ${placeholder}`);
    }
}
