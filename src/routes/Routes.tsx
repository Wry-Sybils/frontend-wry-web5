import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GenerateDID from "../pages/GenerateDID";

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
    ])

    return <RouterProvider router={routes} />
}