import { render } from "@testing-library/react";
import React from "react";
import ColorPickerApp from "./App";

test("renders learn react link", () => {
    const { getByText } = render(<ColorPickerApp />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
