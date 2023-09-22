import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import ScheduleManager from "./routes/ScheduleManager";
import Statistics from "./routes/Statistics";
import CreateSchedule from "./routes/CreateSchedule";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/manage",
        element: <ScheduleManager />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/create",
        element: <CreateSchedule />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
