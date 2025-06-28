import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./assets/components/home/home.jsx";
import Upload from "./assets/components/upload/upload.jsx";
import About from "./assets/components/about/about.jsx";
import History from "./assets/components/history/history.jsx";

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
        element: <Upload/>
      },
      {
        path: "about",
        element:<About/>
      },
      {
        path: "history",
        element:<History/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
