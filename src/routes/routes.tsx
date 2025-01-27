import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-cars",
        element: (
          <div>
            <h1>This is all cars page</h1>
          </div>
        ),
      },
      {
        path: "/about-us",
        element: (
          <div>
            <h1>This is about us page.</h1>
          </div>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
]);

export default router;
