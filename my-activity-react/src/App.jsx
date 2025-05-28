import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import GuestLayout from "./components/pages/GuestLayout";
import MyActivity from "./pages/MyActivity";
import { useStateContext } from "./contexts/contextProvider";

function App() {
    const { token } = useStateContext();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={token ? <MyActivity /> : <GuestLayout />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/users" element={<Users />} />
            </Routes>
        </Router>
    );
}

export default App;
