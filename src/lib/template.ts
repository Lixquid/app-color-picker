const enum SubstituteMode {
    Plain = 0,
    Expression = 1,
}

export function substituteTemplate(
    template: string,
    values: object
): string | { error: true; message: string; index: number } {
    const output: string[] = [];
    let mode: SubstituteMode = SubstituteMode.Plain;
    let idx = 0;
    while (idx < template.length) {
        switch (mode) {
            case SubstituteMode.Plain: {
                let newIdx = template.indexOf("$", idx);
                if (newIdx === -1) {
                    // No more substitutions, we're done
                    output.push(template.slice(idx));
                    return output.join("");
                }

                output.push(template.slice(idx, newIdx));
                if (template[newIdx + 1] === "$") {
                    // Escaped character
                    output.push("$");
                    idx = newIdx + 2;
                    continue;
                }
                if (template[newIdx + 1] === "{") {
                    // Substitution
                    idx = newIdx + 2;
                    mode = SubstituteMode.Expression;
                    continue;
                }
                // Bare dollar
                output.push("$");
                idx = newIdx + 1;
                continue;
            }
            case SubstituteMode.Expression: {
                let newIdx = template.indexOf("}");
                if (newIdx === -1) {
                    // Unmatched slot, error
                    return {
                        error: true,
                        index: idx - 1,
                        message: "Unmatched {",
                    };
                }

                idx = newIdx + 1;
            }
        }
    }

    throw new Error("unreachable");
}
