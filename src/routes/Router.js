import { lazy } from "react";
import AddBook from "../views/AddBook.js";
import LibraryCard from "../views/LibraryCard.js";
import CardMembers from "../views/CardMembers.js";
import RentBook from "../views/RentBook.js";
import RentDatabase from "../views/RentDatabase.js";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"))

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <Starter /> },
      { path: "/addbooks", exact: true, element: <AddBook /> },
      { path: "/librarycard", exact: true, element: <LibraryCard /> },
      { path: "/cardmembers", exact: true, element: <CardMembers/> },
      { path: "/rentbook", exact: true, element: <RentBook/> },
      { path: "/rentdb", exact: true, element: <RentDatabase/> },
      { path: "/myprofile", exact: true, element: <About /> },
    ],
  },
];

export default ThemeRoutes;
