import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
//import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
//import { setupServer } from "msw/node";
import GamePage from "../../../src/features/game/GamePage";
import { store } from "../../../src/app/store/store";
//import { handlers } from "../../mocks/mockApiCalls";
//import { http, HttpResponse } from "msw";
//import { renderWithProviders } from "../../mocks/test.utils";
//import { useFetchSeasonRidersQuery } from "../../../src/features/rider/riderApi";
//const mockStore = configureStore([]);
//const store = makeStore();

//import { setupServer } from "msw/node";

//const server = setupServer(...handlers);

test("GamePage renders correctly", async () => {
  render(
    <Router>
      <Provider store={store}>
        <GamePage />
      </Provider>
    </Router>,
  );
  //  renderWithProviders(<GamePage />);
  const linkElement = screen.getByText(/figura.sp/i);
  expect(linkElement).toBeInTheDocument();
});
