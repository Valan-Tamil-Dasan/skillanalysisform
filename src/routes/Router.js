import { lazy } from "react";

import SADForm from "../views/SADForm.js";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <SADForm /> },
    ],
  },
];

export default ThemeRoutes;
