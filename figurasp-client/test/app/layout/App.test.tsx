import { render, screen } from "@testing-library/react";
import App from "../../../src/app/layout/App";
import { BrowserRouter } from "react-router-dom";

test("App renders correctly", () => {
  render(<App />, { wrapper: BrowserRouter });
  const linkElement = screen.getByText(/figura.sp/i);
  expect(linkElement).toBeInTheDocument();
});
