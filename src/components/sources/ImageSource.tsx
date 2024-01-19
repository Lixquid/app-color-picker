import { useCallback, useRef } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { ColorSourceProps } from "./sources";

/** Reads a {@link File} as a data URL. */
function readFile(src: File): Promise<string | null> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            resolve((ev.target?.result as string) ?? null);
        };
        reader.readAsDataURL(src);
    });
}

/** Creates a {@link HTMLImageElement} from a string source. */
function createImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = src;
    });
}

/** Provides colors from a point clicked on a user-provided image. */
export function ImageSource(props: ColorSourceProps) {
    const canvas = useRef<HTMLCanvasElement>(null);

    // Draws the provided image to the canvas.
    const loadImage = useCallback(
        async (ev: JSX.TargetedEvent<HTMLInputElement, Event>) => {
            if (!canvas.current) {
                return;
            }
            const file = (ev.target as HTMLInputElement).files?.[0];
            if (!file) {
                return;
            }
            const dataURL = await readFile(file);
            if (!dataURL) {
                return;
            }
            const img = await createImage(dataURL);
            canvas.current.width = img.width;
            canvas.current.height = img.height;
            canvas.current.getContext("2d")?.drawImage(img, 0, 0);
        },
        [canvas]
    );

    // Sends the color of the pixel clicked on the canvas.
    const sendColor = useCallback(
        (ev: JSX.TargetedMouseEvent<HTMLCanvasElement>) => {
            if (!canvas.current) {
                return;
            }
            const bb = canvas.current.getBoundingClientRect();
            const x = ev.clientX - bb.left;
            const y = ev.clientY - bb.top;

            const data = canvas.current
                .getContext("2d")
                ?.getImageData(x, y, 1, 1).data;
            if (!data) {
                return;
            }

            const [r, g, b] = data;

            if (r === undefined || g === undefined || b === undefined) {
                return;
            }

            props.setColor({
                r,
                g,
                b,
            });
        },
        [canvas, props.setColor]
    );

    return (
        <div class="card-body">
            <input class="form-control mb-3" type="file" onChange={loadImage} />
            <canvas height="0" ref={canvas} onClick={sendColor} />
        </div>
    );
}
