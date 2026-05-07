import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { store } from "../../../src/app/store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SeasonDetails from "../../../src/features/season/SeasonDetails";

describe("SeasonDetails component", () => {
  it("renders it correctly", async () => {
    render(
      <Provider store={store}>
        <SeasonDetails />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    //await -> there is a chunk of time when 'loading...' is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const revealButton = await screen.findByRole("button", {
      name: /reveal teams/i,
    });
    await expect(screen.findByText(/2025/i)).resolves.toBeInTheDocument();
    screen.debug(undefined, 100_000);
  });
});
