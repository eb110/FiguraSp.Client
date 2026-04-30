import { render, screen } from "@testing-library/react";
import NavBar from "../../../src/app/layout/NavBar";
import { BrowserRouter as Router } from "react-router-dom";

test("NavBar renders correctly", () => {
  render(
    <Router>
      <NavBar />
    </Router>,
  );
  const linkElement = screen.getByText(/figura.sp/i);
  expect(linkElement).toBeInTheDocument();
});
