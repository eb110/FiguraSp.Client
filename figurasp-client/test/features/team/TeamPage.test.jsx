import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import TeamPage from "../../../src/features/team/TeamPage";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../src/app/store/store.ts";
import { Provider } from "react-redux";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";

export const handlers = [
  http.get("http://localhost:5000/api/team/teams", async () => {
    await delay(150);
    return HttpResponse.json([
      { id: 1, name: "Team A" },
      { id: 2, name: "Team B" },
    ]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

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
    await screen.findByText("Team A");
    await expect(screen.findByText("Team B")).resolves.toBeInTheDocument();
  });
});
