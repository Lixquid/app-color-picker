export interface NumberSliderInputProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;

    step?: number;
}

export function NumberSliderInput(props: NumberSliderInputProps) {
    return (
        <div class="row mb-1 align-items-center">
            <div class="col-sm-5">
                <div class="input-group">
                    <span class="input-group-text">{props.label}</span>
                    <input
                        type="number"
                        class="form-control"
                        value={props.value}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                        onChange={(ev) =>
                            props.onChange(
                                parseFloat(
                                    (ev.target as HTMLInputElement).value
                                )
                            )
                        }
                    />
                </div>
            </div>
            <div class="col-sm-7">
                <input
                    type="range"
                    class="form-range"
                    value={props.value}
                    min={props.min}
                    max={props.max}
                    step={props.step ?? 0.001}
                    onChange={(ev) =>
                        props.onChange(
                            parseFloat((ev.target as HTMLInputElement).value)
                        )
                    }
                />
            </div>
        </div>
    );
}
