import Color = require("color");

export interface IColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
}

export function toHex(color: IColor) {
    return (
        "#" +
        color.r.toString(16).padStart(2, "0") +
        color.g.toString(16).padStart(2, "0") +
        color.b.toString(16).padStart(2, "0")
    );
}

export function fromHex(hex: string): IColor {
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
    };
}

export function toFormat(color: IColor, format: string) {
    switch (format) {
        case "Hex":
            return toHex(color);
        case "RGB":
            return color.r + ", " + color.g + ", " + color.b;
        case "HSL": {
            const c = Color(color).hsl();
            return c.hue() + ", " + c.saturationl() + ", " + c.lightness();
        }
        case "HSV": {
            const c = Color(color).hsv();
            return c.hue() + ", " + c.saturationv() + ", " + c.value();
        }
        case "CMYK": {
            const c = Color(color).cmyk();
            return (
                c.cyan() +
                ", " +
                c.magenta() +
                ", " +
                c.yellow() +
                ", " +
                c.black()
            );
        }
    }

    throw new Error("unreachable");
}
