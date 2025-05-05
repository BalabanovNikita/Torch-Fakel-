import './App.css';
import ReadyRoutes from "./components/routes";
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <ReadyRoutes/>
            </div>
        </Router>
    );
}

export default App;
