import { JSX } from "preact/jsx-runtime";
import { Color } from "../../lib/color";
import { ComplementarySource } from "./ComplementarySource";
import { ImageSource } from "./ImageSource";
import { InputSource } from "./InputSource";
import { NativeSource } from "./NativeSource";
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
export const colorSources = {
    Input: InputSource,
    Palettes: PaletteSource,
    Native: NativeSource,
    Image: ImageSource,
    Complementary: ComplementarySource,
} satisfies Record<string, ColorSource>;
