import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import SeasonPage from "../../features/season/SeasonPage";
import RiderPage from "../../features/rider/RiderPage";
import TeamPage from "../../features/team/TeamPage";
import RiderDetails from "../../features/rider/RiderDetails";
import TeamDetails from "../../features/team/TeamDetails";
import SeasonDetails from "../../features/season/SeasonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "/seasons", element: <SeasonPage /> },
      { path: "/seasons/:id", element: <SeasonDetails /> },
      { path: "/riders", element: <RiderPage /> },
      { path: "/riders/:id", element: <RiderDetails /> },
      { path: "/teams", element: <TeamPage /> },
      { path: "/teams/:id", element: <TeamDetails /> },
    ],
  },
]);
