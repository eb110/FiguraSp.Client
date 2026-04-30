import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../../src/app/layout/App";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
  it("renders correctly", () => {
    render(<App />, { wrapper: BrowserRouter });
    expect(screen.getByText("FIGURA.SP")).toBeInTheDocument();
  });
});
