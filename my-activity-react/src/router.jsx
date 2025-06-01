import { createBrowserRouter } from "react-router-dom";
import MyActivity from "./pages/MyActivity";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/pages/DashboardLayout";
import UserForm from "./pages/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MyActivity />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/dashboard/users",
                element: <Users />,
            },
            {
                path: "/dashboard/users/new",
                element: <UserForm key="UserCreate" />,
            },
            {
                path: "/dashboard/users/:id",
                element: <UserForm key="UserUpdate" />,
            },
        ],
    },
]);

export default router;
