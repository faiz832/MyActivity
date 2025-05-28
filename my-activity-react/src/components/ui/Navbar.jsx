import { useStateContext } from "../../contexts/contextProvider";
import { Button } from "@/components/ui/button";
import axiosClient from "../../axiosClient";
import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Navbar({ children }) {
    const { user, token, setToken, setUser } = useStateContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    const onLogout = () => {
        axiosClient.get("/logout").then(({}) => {
            setUser(null);
            setToken(null);
        });
    };

    return (
        <div>
            <div className="mx-auto py-4 px-8 flex items-center justify-between border-b">
                <Link to="/">MyActivity</Link>
                <div className="flex items-center gap-4">
                    <h1>Welcome, {user.name}</h1>
                    {!location.pathname.startsWith("/dashboard") && (
                        <Button
                            onClick={() => navigate("/dashboard")}
                            className="cursor-pointer"
                        >
                            Dashboard
                        </Button>
                    )}
                    <Button onClick={onLogout} className="cursor-pointer">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
