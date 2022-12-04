import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { HomePage } from "./pages";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}

export default App;
