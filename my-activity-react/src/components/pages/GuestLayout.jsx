import { Navigate } from "react-router-dom";
import { useStateContext } from "../../contexts/contextProvider";

export default function GuestLayout() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="">Guest</div>
        </>
    );
}
