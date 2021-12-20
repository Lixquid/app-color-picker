import { useState } from "preact/hooks";

export function useForceUpdate() {
    const [v, setV] = useState(false);

    return () => {
        setV(!v);
    };
}
