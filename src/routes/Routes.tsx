import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GenerateDID from "../pages/GenerateDID";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import YourData from "../components/YourData";
import CreateDataContent from "../components/DataContent";


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
            path: 'dashboard/',
            element: <Dashboard />,
            children: [
                {
                    path: ':id',
                },
                {
                    path: 'dashboard/:id',
                    element: <YourData />,
                },
                {
                    path:':id/:dataId',
                    element: <CreateDataContent />
                }
            ]
        },
    ])

    return <RouterProvider router={routes} />
}