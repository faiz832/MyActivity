import axiosClient from "../axiosClient";
import Navbar from "../components/ui/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

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

    const onDelete = (user) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;
        axiosClient.delete(`/users/${user.id}`).then(() => getUsers());
    };

    return (
        <>
            <div className="mb-4">
                <h1>Users</h1>
                <Button
                    onClick={() => navigate("/dashboard/users/new")}
                    className="cursor-pointer"
                >
                    Add User
                </Button>
            </div>

            <table className="border w-full">
                <thead className="border">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {loading && <div>Loading...</div>}
                <tbody className="text-center">
                    {users.map((user, i) => (
                        <tr key={user.id}>
                            <td>{i + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className="py-2">
                                <Button
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/users/${user.id}/edit`
                                        )
                                    }
                                    className="cursor-pointer"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={() => onDelete(user)}
                                    className="cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
