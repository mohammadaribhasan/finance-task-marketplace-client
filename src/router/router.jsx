
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../rootlayout/RootLayout";
import Page from "../component/Page"


import PrivateRoute from "../component/PrivateRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import LogInPage from "../pages/LogInPage";
import Error from "../pages/Error";
import ForgotPassword from "../pages/ForgotPassword";
import AddTask from "../pages/AddTask";
import BrowseTask from "../pages/BrowseTask"
import MyPostedTasks from "../pages/MyPostedTasks"
import Details from "../pages/Details";
import Edit from "../pages/Edit";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [

      {
        path: "/",
        element: (
          <Page title="Find Jobs & Tasks | TaskCrowd">
            <Home />
          </Page>
        ),
        loader: () => fetch("https://finance-task-marketplace-sarver.vercel.app/users"),
        hydrateFallbackElement: (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ),
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <Page title="Post a Task | TaskCrowd">
              <AddTask />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/myPostedTasks",
        element: (
          <PrivateRoute>
            <Page title="My Posted Tasks | TaskCrowd">
              <MyPostedTasks />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <Page title="Edit | TaskCrowd">
              <Edit />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/browseTasks",
        element: (
          <Page title="Find Jobs & Tasks | TaskCrowd">
            <BrowseTask />
          </Page>
        ),
        loader: () => fetch("https://finance-task-marketplace-sarver.vercel.app/users"),
        hydrateFallbackElement: (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <Page title="Login | TaskCrowd">
            <Login />
          </Page>
        ),
        errorElement: <Error />,
      },
      {
        path: "/registration",
        element: (
          <Page title="Create Account | TaskCrowd">
            <Registration />
          </Page>
        ),
        errorElement: <Error />,
      },
      {
        path: "/forgotpass",
        element: (
          <Page title="Forgot Password | TaskCrowd">
            <ForgotPassword />
          </Page>
        ),
        errorElement: <Error />,
      },
      {
        path: "/loginfirst",
        element: (
          <Page title="Login Required | TaskCrowd">
            <LogInPage />
          </Page>
        ),
        errorElement: <Error />,
      },

      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Page title="Details | TaskCrowd">
              <Details />
            </Page>
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },

    ],
  },
]);
export default router;
