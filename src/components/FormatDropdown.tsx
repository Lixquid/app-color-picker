import { StateUpdater } from "preact/hooks";

export function FormatDropdown({
    format,
    setFormat,
}: {
    format: string;
    setFormat: StateUpdater<string>;
}) {
    function Item({ children }: { children: string }) {
        return (
            <li>
                <a
                    class="dropdown-item"
                    href="#"
                    onClick={(e) => {
                        setFormat(children);
                        e.preventDefault();
                    }}
                >
                    {children}
                </a>
            </li>
        );
    }

    return (
        <>
            <button
                class="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {format}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <Item>Hex</Item>
                <Item>RGB</Item>
                <Item>HSL</Item>
                <Item>HSV</Item>
                <Item>CMYK</Item>
            </ul>
        </>
    );
}
