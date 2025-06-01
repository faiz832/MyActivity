import { Outlet } from "react-router-dom";
import Navbar from "../ui/navbar";

export default function DashboardLayout() {
    return (
        <>
            <Navbar />
            <div className="mx-auto py-4 px-8">
                <Outlet />
            </div>
        </>
    );
}
