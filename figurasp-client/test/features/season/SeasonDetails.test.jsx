import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    await expect(
      screen.findByRole("button", {
        name: /reveal teams/i,
      }),
    ).resolves.toBeInTheDocument();
    await expect(screen.findByText(/2025/i)).resolves.toBeInTheDocument();
  });

  it("reveals the teams list", async () => {
    render(
      <Provider store={store}>
        <SeasonDetails />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const revealButton = await screen.findByRole("button", {
      name: /reveal teams/i,
    });
    fireEvent.click(revealButton);
    const team = await screen.findByRole("checkbox", { name: /opole/i });
    expect(team).toBeInTheDocument();
    expect(team.checked).toBe(false);
  });

  it("not allows to create games with one selected team only", async () => {
    render(
      <Provider store={store}>
        <SeasonDetails />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const revealButton = await screen.findByRole("button", {
      name: /reveal teams/i,
    });
    fireEvent.click(revealButton);
    const team1 = await screen.findByRole("checkbox", { name: /opole/i });
    const team2 = await screen.findByRole("checkbox", { name: /warsaw/i });
    fireEvent.click(team1);
    fireEvent.click(team2);
    fireEvent.click(team2);
    expect(team1.checked).toBe(true);
    expect(team2.checked).toBe(false);
    const level = await screen.findByRole("combobox");
    fireEvent.mouseDown(level);
    const option = await screen.findByRole("option", { name: "DMP3" });
    expect(option).toBeInTheDocument();
    fireEvent.click(option);
    const selectedOption = await screen.findByText(/dmp3/i);
    expect(selectedOption).toBeInTheDocument();
    const createGamesButton = await screen.findByRole("button", {
      name: /create games/i,
    });
    expect(createGamesButton.disabled).toBe(true);
  });

  it("not allows to create games with unselected game level", async () => {
    render(
      <Provider store={store}>
        <SeasonDetails />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const revealButton = await screen.findByRole("button", {
      name: /reveal teams/i,
    });
    fireEvent.click(revealButton);
    const team1 = await screen.findByRole("checkbox", { name: /opole/i });
    const team2 = await screen.findByRole("checkbox", { name: /warsaw/i });
    fireEvent.click(team1);
    fireEvent.click(team2);
    expect(team1.checked).toBe(true);
    expect(team2.checked).toBe(true);
    const createGamesButton = await screen.findByRole("button", {
      name: /create games/i,
    });
    expect(createGamesButton.disabled).toBe(true);
  });

  it("it adds games to list", async () => {
    render(
      <Provider store={store}>
        <SeasonDetails />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const revealButton = await screen.findByRole("button", {
      name: /reveal teams/i,
    });
    fireEvent.click(revealButton);
    const team1 = await screen.findByRole("checkbox", { name: /opole/i });
    const team2 = await screen.findByRole("checkbox", { name: /warsaw/i });
    fireEvent.click(team1);
    fireEvent.click(team2);
    const level = await screen.findByRole("combobox");
    fireEvent.mouseDown(level);
    const option = await screen.findByRole("option", { name: "DMP3" });
    fireEvent.click(option);
    const createGamesButton = await screen.findByRole("button", {
      name: /create games/i,
    });
    expect(createGamesButton.disabled).toBe(false);
    fireEvent.click(createGamesButton);
    await waitFor(() =>
      expect(screen.getByText(/confirm/i)).toBeInTheDocument(),
    );
    const editLink = await screen.findByRole("link", {
      name: /edit/i,
    });
    const confirmButton = await screen.findByRole("button", {
      name: /confirm/i,
    });

    expect(editLink).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();

    //screen.debug(undefined, 100_000);
  });
});
