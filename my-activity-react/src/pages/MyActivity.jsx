import Navbar from "../components/ui/navbar";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

export default function MyActivity() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-100">
                <h1>This is MyActivity</h1>
            </div>
            <Outlet />
        </>
    );
}
