import {Route, Routes} from "react-router-dom";
import { Search, Grid2x2Check } from 'lucide-react';
import MainPage from "./Pages/MainPage/MainPage";
import DataGatheringPage from "./Pages/DataGatheringPage/DataGatheringPage";

const routes = [
    {path: '/', element: <MainPage/>, name: 'home', icon: Search},
    {path: '/data_gathering', element: <DataGatheringPage/>, name: 'data_gathering', icon: Grid2x2Check},
]

const ReadyRoutes = () => {
    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} element={route.element}/>
            ))}
        </Routes>
    )
}

export {routes};

export default ReadyRoutes;