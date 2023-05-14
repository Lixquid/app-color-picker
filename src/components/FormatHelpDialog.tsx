/** Props for the FormatHelpDialog component */
interface FormatHelpDialogProps {
    /** Function to close the dialog */
    close: () => void;
}

/** A dialog that displays help for the format string */
export function FormatHelpDialog({ close }: FormatHelpDialogProps) {
    return (
        <>
            <div class="modal d-block">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Format String Help</h5>
                            <button
                                type="button"
                                class="btn-close"
                                onClick={close}
                                title="Close"
                            />
                        </div>
                        <div class="modal-body">
                            <p>
                                The format string is used to customize the
                                formatting of the output. It can contain any
                                combination of text and format specifiers. The
                                format specifiers are replaced with the
                                corresponding value from the color.
                            </p>
                            <p>
                                For example, the format string{" "}
                                <code>{`rgb({r}, {g}, {b})`}</code> would output
                                the color as <code>{`rgb(255, 128, 0)`}</code>{" "}
                                for orange.
                            </p>
                            <p>The format specifiers are as follows:</p>
                            <table class="table table-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>Specifier</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>r</code>, <code>red</code>
                                        </td>
                                        <td>
                                            The red component of the color in
                                            RGB as a number from 0 to 255.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>g</code>, <code>green</code>
                                        </td>
                                        <td>
                                            The green component of the color in
                                            RGB as a number from 0 to 255.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>b</code>, <code>blue</code>
                                        </td>
                                        <td>
                                            The blue component of the color in
                                            RGB as a number from 0 to 255.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>h</code>, <code>hue</code>
                                        </td>
                                        <td>
                                            The hue of the color in HSL as a
                                            number from 0 to 359.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>s</code>,{" "}
                                            <code>saturation</code>
                                        </td>
                                        <td>
                                            The saturation of the color in HSL
                                            as a number from 0 to 100.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>l</code>,{" "}
                                            <code>lightness</code>
                                        </td>
                                        <td>
                                            The lightness of the color in HSL as
                                            a number from 0 to 100.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>decimal</code>
                                        </td>
                                        <td>
                                            The color as a decimal number
                                            between 0 and 16777215 (FFFFFF).
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h3>Format Specifier Options</h3>
                            <p>
                                Each format specifier can be followed by a colon
                                and options to customize the output. For
                                example, <code>{`{r:02x}`}</code> would output
                                the red component of the color as a two-digit
                                lowercase hexadecimal number, with leading zeros
                                if necessary.
                            </p>
                            <p>
                                The leading numbers in the options are the
                                minimum number of digits to output. If the
                                number is less than the minimum, leading spaces
                                are added. If the number is greater than the
                                minimum, the number is not truncated.
                            </p>
                            <p>
                                If the leading number is preceded by a zero,
                                leading zeros are added instead of spaces.'
                            </p>
                            <p>
                                Finally, a single letter can be added to the end
                                of the options to specify how the number should
                                be formatted. The following letters are
                                supported:
                            </p>
                            <table class="table table-sm table-striped">
                                <thead>
                                    <tr>
                                        <th>Letter</th>
                                        <th>Output</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <code>d</code>, <code>i</code>
                                        </td>
                                        <td>
                                            The number as a decimal integer.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>f</code>
                                        </td>
                                        <td>
                                            The number as a decimal floating
                                            point number.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>e</code>
                                        </td>
                                        <td>
                                            The number as a decimal floating
                                            point number in scientific, or
                                            exponential notation.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>o</code>
                                        </td>
                                        <td>
                                            The number as an octal integer.
                                            (Base 8)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>x</code>
                                        </td>
                                        <td>
                                            The number as a lowercase
                                            hexadecimal integer. (Base 16)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>X</code>
                                        </td>
                                        <td>
                                            The number as an uppercase
                                            hexadecimal integer. (Base 16)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        </>
    );
}
