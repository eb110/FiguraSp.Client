import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import SeasonPage from "../../features/season/SeasonPage";
import RiderPage from "../../features/rider/RiderPage";
import TeamPage from "../../features/team/TeamPage";
import RiderDetails from "../../features/rider/RiderDetails";
import TeamDetails from "../../features/team/TeamDetails";
import SeasonDetails from "../../features/season/SeasonDetails";
import GamePage from "../../features/game/GamePage";
import NotFound from "../../features/home/NotFound";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "seasons", element: <SeasonPage /> },
      { path: "seasons/:id/:year", element: <SeasonDetails /> },
      { path: "riders", element: <RiderPage /> },
      { path: "riders/:id", element: <RiderDetails /> },
      { path: "teams", element: <TeamPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "teams/:id", element: <TeamDetails /> },
      { path: "games/:id/:year", element: <GamePage /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate to="/not-found" /> },
    ],
  },
]);
