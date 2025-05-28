import Navbar from "../components/ui/navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <h1>Dashboard</h1>
            <Button
                onClick={() => navigate("/dashboard/users")}
                className="cursor-pointer"
            >
                Users
            </Button>
        </>
    );
}
