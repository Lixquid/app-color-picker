import { Color, fromHSL } from "./color";

/** Returns a 5-tuple of analogous colors, with the original color in the middle. */
export function analogous(
    hsl: [h: number, s: number, l: number],
    factor = 1
): [Color, Color, Color, Color, Color] {
    const [h, s, l] = hsl;
    return [
        fromHSL([h - 30 * factor, s, l]),
        fromHSL([h - 15 * factor, s, l]),
        fromHSL([h, s, l]),
        fromHSL([h + 15 * factor, s, l]),
        fromHSL([h + 30 * factor, s, l]),
    ];
}

/** Returns a 5-tuple of shades of the original color, with the original color in the middle. */
export function shades(
    hsl: [h: number, s: number, l: number],
    factor = 1
): [Color, Color, Color, Color, Color] {
    const [h, s, l] = hsl;
    return [
        fromHSL([h, s, l - 0.2 * factor]),
        fromHSL([h, s, l - 0.1 * factor]),
        fromHSL([h, s, l]),
        fromHSL([h, s, l + 0.1 * factor]),
        fromHSL([h, s, l + 0.2 * factor]),
    ];
}

/** Returns a 5-tuple of triadic colors, with the original color in the middle. */
export function triadic(
    hsl: [h: number, s: number, l: number],
    factor = 1
): [Color, Color, Color, Color, Color] {
    const [h, s, l] = hsl;
    return [
        fromHSL([h - 120 * factor, s, l]),
        fromHSL([h - 60 * factor, s, l]),
        fromHSL([h, s, l]),
        fromHSL([h + 60 * factor, s, l]),
        fromHSL([h + 120 * factor, s, l]),
    ];
}

/** Returns a 5-tuple of complementary colors, with shades of the original color for the first two, the original color in the middle, and shades of the complementary color for the last two. */
export function complementary(
    hsl: [h: number, s: number, l: number],
    factor = 1
): [Color, Color, Color, Color, Color] {
    const [h, s, l] = hsl;
    return [
        fromHSL([h, s, l + 0.1 * factor]),
        fromHSL([h, s, l - 0.1 * factor]),
        fromHSL([h, s, l]),
        fromHSL([h + 180, s, l < 0.5 ? l + 0.1 * factor : l - 0.1 * factor]),
        fromHSL([h + 180, s, l]),
    ];
}

/** Returns a 5-tuple of red-adjusted colors, with the original color in the middle. */
export function red(
    color: Color,
    factor = 1
): [Color, Color, Color, Color, Color] {
    const { r, g, b } = color;
    return [
        { r: Math.min(Math.max(r - 30 * factor, 0), 255), g, b },
        { r: Math.min(Math.max(r - 15 * factor, 0), 255), g, b },
        color,
        { r: Math.min(Math.max(r + 15 * factor, 0), 255), g, b },
        { r: Math.min(Math.max(r + 30 * factor, 0), 255), g, b },
    ];
}

/** Returns a 5-tuple of green-adjusted colors, with the original color in the middle. */
export function green(
    color: Color,
    factor = 1
): [Color, Color, Color, Color, Color] {
    const { r, g, b } = color;
    return [
        { r, g: Math.min(Math.max(g - 30 * factor, 0), 255), b },
        { r, g: Math.min(Math.max(g - 15 * factor, 0), 255), b },
        color,
        { r, g: Math.min(Math.max(g + 15 * factor, 0), 255), b },
        { r, g: Math.min(Math.max(g + 30 * factor, 0), 255), b },
    ];
}

/** Returns a 5-tuple of blue-adjusted colors, with the original color in the middle. */
export function blue(
    color: Color,
    factor = 1
): [Color, Color, Color, Color, Color] {
    const { r, g, b } = color;
    return [
        { r, g, b: Math.min(Math.max(b - 30 * factor, 0), 255) },
        { r, g, b: Math.min(Math.max(b - 15 * factor, 0), 255) },
        color,
        { r, g, b: Math.min(Math.max(b + 15 * factor, 0), 255) },
        { r, g, b: Math.min(Math.max(b + 30 * factor, 0), 255) },
    ];
}
