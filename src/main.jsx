import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./assets/components/home/home.jsx";
import Upload from "./assets/components/upload/upload.jsx";
import About from "./assets/components/about/about.jsx";
import History from "./assets/components/history/history.jsx";
import AuthHero from "./assets/components/login/AuthHero.jsx";
import { User } from "lucide-react";
import { UserProvider } from "./userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "login",
        element: <AuthHero />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
