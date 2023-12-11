import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GenerateDID from "../pages/GenerateDID";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ConnectApp from "../components/ConnectApp";
import YourData from "../components/YourData";


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
                    path: ':id',
                },
                {
                    path: '/dashboard/',
                },
                {
                    path: '/dashboard/',
                    element: <YourData />,
                    children: [
                        {
                            path: ':id'
                        }
                    ]
                }
            ]
        },
    ])

    return <RouterProvider router={routes} />
}