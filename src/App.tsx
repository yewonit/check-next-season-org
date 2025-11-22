import "./App.css";
import CheckMyGroupPageForAllNation from "./pages/CheckMyGroupPageForAllNationPage";
import CheckMyNewGroupPage from "./pages/CheckMyNewGroupPage";
import MainPage from "./pages/MainPage";
import NewGroupOpeningPage from "./pages/NewGroupOpeningPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/all-nation-old-group",
    element: <CheckMyGroupPageForAllNation />,
  },
  {
    path: "/new-group-check-my-group",
    element: <CheckMyNewGroupPage />,
  },

  {
    path: "/new-group-arrival",
    element: <NewGroupOpeningPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
