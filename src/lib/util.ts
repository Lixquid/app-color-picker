/** Sets the contents of the clipboard to the given text using the Clipboard API */
export function setClipboard(text: string) {
    navigator.clipboard.writeText(text).catch((err) => {
        console.error("Failed to write to clipboard", err);
    });
}
