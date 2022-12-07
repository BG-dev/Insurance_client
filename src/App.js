import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { AgentsPage, ClientsPage, ContractsPage, HomePage } from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
      </Routes>
    </>
  );
}

export default App;
