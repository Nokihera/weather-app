import { createBrowserRouter } from "react-router-dom"
import Layout from "../components/Layout"
import Dashboard from "../pages/Dashboard"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            }
        ]
    }
])
export default router