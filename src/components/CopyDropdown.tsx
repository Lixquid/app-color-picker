import { useEffect, useState } from "preact/hooks";

export function CopyDropdown({ str }: { str: string }) {
    const [auto, setAuto] = useState(false);

    function setClipboard() {
        navigator.clipboard.writeText(str);
    }

    useEffect(() => {
        if (auto) {
            setClipboard();
        }
    }, [str, auto]);

    return (
        <>
            <button
                type="button"
                class="btn btn-success"
                onClick={setClipboard}
            >
                Copy
            </button>
            <button
                type="button"
                class="btn btn-success dropdown-toggle dropdown-toggle-split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <span class="visually-hidden">Dropdown</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <a
                        class="dropdown-item"
                        href="#"
                        onClick={(ev) => {
                            setAuto(!auto);
                            ev.preventDefault();
                        }}
                    >
                        {auto && "\u2713"} Automatically Copy
                    </a>
                </li>
            </ul>
        </>
    );
}
