import { useRoutes } from "react-router-dom"
import { Home } from "./Home/Home"
import { Login } from "./Login/Login"
import { Branch } from "./Branch/Branch"

export const routes = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let element = useRoutes([
        {
            path: '/login',
            element: <Login />
        },{
            path: '/home',
            element: <Home />
        },{
            path: '/',
            element: <Branch />
        }
    ])
    return element
}