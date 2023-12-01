import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GenerateDID from "../pages/GenerateDID";
import Login from "../pages/Login";


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
    ])

    return <RouterProvider router={routes} />
}