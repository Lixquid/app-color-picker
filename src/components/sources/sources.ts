import { JSX } from "preact/jsx-runtime";
import { Color } from "../../lib/color";
import { HTML5Source } from "./HTML5Source";
import { ImageSource } from "./ImageSource";
import { PaletteSource } from "./PaletteSource";

/** The type of props to color sources. */
export interface ColorSourceProps {
    /** The current color. */
    color: Color;
    /** Function to set the current color. */
    setColor: (color: Color) => void;
}

/** The type of color sources. */
export type ColorSource = (props: ColorSourceProps) => JSX.Element;

/** The list of available color sources. */
export const colorSources: Record<string, ColorSource> = {
    Palettes: PaletteSource,
    "HTML 5": HTML5Source,
    Image: ImageSource,
};
