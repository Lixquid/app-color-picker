/** A representation of a color. */
export interface Color {
    /** The red component of the color. */
    readonly r: number;
    /** The green component of the color. */
    readonly g: number;
    /** The blue component of the color. */
    readonly b: number;
}

/** Available output formats */
export const colorFormats: Record<string, (color: Color) => string> = {
    Hex: toHex,
    RGB: (color) =>
        `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
            color.b
        )})`,
    HSL: (color) => {
        const [h, s, l] = toHSL(color);
        return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
    },
};

//#region Hex
/** Converts a color to a hex string. */
export function toHex(color: Color) {
    return (
        "#" +
        Math.round(color.r).toString(16).padStart(2, "0") +
        Math.round(color.g).toString(16).padStart(2, "0") +
        Math.round(color.b).toString(16).padStart(2, "0")
    );
}

/** Converts a hex string to a color. */
export function fromHex(hex: string): Color | undefined {
    // If the hex string is invalid, return undefined.
    if (!/^#?[0-9a-f]{6}$/i.test(hex)) {
        return undefined;
    }
    // Remove the leading # if it exists.
    if (hex.startsWith("#")) {
        hex = hex.slice(1);
    }
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
    };
}
//#endregion

//#region RGB
/** Converts a color to an RGB tuple. */
export function toRGB(color: Color): [r: number, g: number, b: number] {
    return [color.r, color.g, color.b];
}

/** Converts an RGB tuple to a color. */
export function fromRGB(rgb: [r: number, g: number, b: number]): Color {
    return { r: rgb[0], g: rgb[1], b: rgb[2] };
}
//#endregion

//#region HSL
/** Calculate the modulo of a number. */
function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

/** Converts a color to an HSL tuple. */
export function toHSL(color: Color): [h: number, s: number, l: number] {
    // Convert the RGB values to the range [0, 1].
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;
    // Find the minimum and maximum values.
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    // Calculate the lightness.
    const l = (min + max) / 2;
    // If the minimum and maximum values are the same, the color is a shade of gray.
    if (min === max) {
        return [0, 0, l];
    }
    // Calculate the saturation.
    const s =
        l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
    // Calculate the hue.
    let h = 0;
    if (r === max) {
        h = (g - b) / (max - min);
    }
    if (g === max) {
        h = 2 + (b - r) / (max - min);
    }
    if (b === max) {
        h = 4 + (r - g) / (max - min);
    }
    h *= 60;
    if (h < 0) {
        h += 360;
    }
    return [h, s, l];
}

function hueToRGB(p: number, q: number, t: number) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}

/** Converts an HSL tuple to a color. */
export function fromHSL(hsl: [h: number, s: number, l: number]): Color {
    // Ensure hue is in the range [0, 360).
    let h = mod(hsl[0], 360);
    // Ensure saturation and lightness are in the range [0, 1].
    const s = Math.max(0, Math.min(1, hsl[1]));
    const l = Math.max(0, Math.min(1, hsl[2]));
    // If the saturation is 0, the color is a shade of gray.
    if (s === 0) {
        return { r: l * 255, g: l * 255, b: l * 255 };
    }
    // Convert the hue to the range [0, 1).
    h = hsl[0] / 360;
    // Calculate the intermediate values.
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    // Calculate the RGB values.
    const r = hueToRGB(p, q, h + 1 / 3) * 255;
    const g = hueToRGB(p, q, h) * 255;
    const b = hueToRGB(p, q, h - 1 / 3) * 255;
    return { r, g, b };
}
//#endregion
