import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../../../src/app/store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SeasonPage from "../../../src/features/season/SeasonPage";

describe("SeasonPage component", () => {
  it("renders correctly", async () => {
    render(
      <Provider store={store}>
        <SeasonPage />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    //await -> there is a chunk of time when 'loading...' is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await expect(screen.findByText(/2025/i)).resolves.toBeInTheDocument();
    await expect(screen.findByText(/2026/i)).resolves.toBeInTheDocument();
  });
  it("adds season correctly", async () => {
    render(
      <Provider store={store}>
        <SeasonPage />
      </Provider>,
      { wrapper: BrowserRouter },
    );

    // Simulate adding a new season
    const selectYear = await screen.findByRole("combobox");
    expect(selectYear).toBeInTheDocument();
    const selectValue1948 = screen.getByText(/1948/i);
    expect(selectValue1948).toBeInTheDocument();
    const heading1 = screen.getByRole("heading", { name: /2025/i, level: 6 });
    expect(heading1).toBeInTheDocument();
    const heading2 = screen.getByRole("heading", { name: /2026/i, level: 6 });
    expect(heading2).toBeInTheDocument();
    fireEvent.mouseDown(selectYear);
    const option = await screen.findByRole("option", { name: "1949" });
    expect(option).toBeInTheDocument();
    fireEvent.click(option);

    const selectValue1949 = await screen.findByText(/1949/i);
    expect(selectValue1949).toBeInTheDocument();

    let thirdHeading = screen.queryByRole("heading", {
      name: /1949/i,
      level: 6,
    });
    expect(thirdHeading).toBeNull();

    // screen.debug(undefined, 100_000);

    const addSeason = screen.getByRole("button", { name: /add season/i });
    expect(addSeason).toBeInTheDocument();
    fireEvent.click(addSeason);

    thirdHeading = await screen.findByRole("heading", {
      name: /1949/i,
      level: 6,
    });
    expect(thirdHeading).toBeInTheDocument();
  });
});
