import { StateUpdater, useRef } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { IColor } from "../../lib/color";

function readFile(src: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            resolve((ev.target?.result as string) ?? null);
        };
        reader.readAsDataURL(src);
    });
}

function createImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.src = src;
    });
}

export function ImageSource({ setColor }: { setColor: StateUpdater<IColor> }) {
    const canvas = useRef<HTMLCanvasElement>(null);

    async function loadImage(
        ev: JSXInternal.TargetedEvent<HTMLInputElement, Event>
    ) {
        if (!canvas.current) {
            return;
        }

        const file = (ev.target as HTMLInputElement).files?.[0];
        if (!file) {
            return;
        }

        const img = await createImage(await readFile(file));
        canvas.current.width = img.width;
        canvas.current.height = img.height;
        canvas.current.getContext("2d")?.drawImage(img, 0, 0);
    }

    function sendColor(ev: JSXInternal.TargetedMouseEvent<HTMLCanvasElement>) {
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

        setColor({ r: data[0], g: data[1], b: data[2] });
    }

    return (
        <>
            <input class="form-control mb-3" type="file" onChange={loadImage} />
            <canvas height="0" ref={canvas} onClick={sendColor} />
        </>
    );
}
