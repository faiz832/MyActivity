import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <>
            <Button
                onClick={() => navigate("/dashboard/users")}
                className="cursor-pointer"
            >
                Users
            </Button>
        </>
    );
}
