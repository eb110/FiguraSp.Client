import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TeamPage from "../../../src/features/team/TeamPage";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../src/app/store/store.ts";
import { Provider } from "react-redux";

describe("TeamPage component", () => {
  it("renders correctly", async () => {
    render(
      <Provider store={store}>
        <TeamPage />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    //await -> there is a chunk of time when 'loading...' is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await expect(screen.findByText(/Team A/i)).resolves.toBeInTheDocument();
    await expect(screen.findByText(/Team B/i)).resolves.toBeInTheDocument();
  });
});
