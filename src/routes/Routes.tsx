import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GenerateDID from "../pages/GenerateDID";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";


export default function RouterContent() {
    const routes = createBrowserRouter([
        {
            path: '/',
            element: <GenerateDID/>,
            children: [
                {
                    path: '/:id'
                }
            ]
        },
        {
            path: '/login',
            element: <Login /> ,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
                {
                    path: '/dashboard/:id',
                }
            ]
        },
    ])

    return <RouterProvider router={routes} />
}