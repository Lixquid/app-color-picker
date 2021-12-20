import { StateUpdater } from "preact/hooks";

export function FormatDropdown({
    format,
    setFormat,
}: {
    format: string;
    setFormat: StateUpdater<string>;
}) {
    function formatDropdownItem(name: string) {
        return (
            <li>
                <a
                    class="dropdown-item"
                    href="#"
                    onClick={(e) => {
                        setFormat(name);
                        e.preventDefault();
                    }}
                >
                    {name}
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
                {formatDropdownItem("Hex")}
                {formatDropdownItem("RGB")}
            </ul>
        </>
    );
}
