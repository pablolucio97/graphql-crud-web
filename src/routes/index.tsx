import { ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UsersScreen from "../pages";
import PhotosScreen from "../pages/photos";

type route = {
  path: string;
  element: ReactNode;
};

const routes: route[] = [
  {
    path: "/",
    element: <UsersScreen />,
  },
  {
    path: "/photos",
    element: <PhotosScreen />,
  },
];

const appRoutes = createBrowserRouter(routes);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={appRoutes}/>;
};

export default AppRoutes;
