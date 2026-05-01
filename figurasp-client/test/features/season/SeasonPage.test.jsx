import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
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
  //   it("adds season correctly", async () => {
  //     render(
  //       <Provider store={store}>
  //         <SeasonPage />
  //       </Provider>,
  //       { wrapper: BrowserRouter },
  //     );
  //     // Simulate adding a new season
  //     await screen.findByText("Add Season").click();
  //     await screen.findByLabelText("Year").type("2020");
  //     await screen.findByText("Submit").click();

  //     // Check if the new season is displayed
  //     await expect(screen.findByText(/2027/i)).resolves.toBeInTheDocument();
  //   });
});
