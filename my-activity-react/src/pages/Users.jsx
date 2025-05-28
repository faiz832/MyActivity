import axiosClient from "../axiosClient";
import Navbar from "../components/ui/navbar";
import { useEffect, useState } from "react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Navbar />
            <h1>Users</h1>
        </>
    );
}
