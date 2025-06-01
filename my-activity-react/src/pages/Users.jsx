import axiosClient from "../axiosClient";
import Navbar from "../components/ui/navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            <div className="mx-auto py-4 px-8">
                <div className="mb-4">
                    <h1>Users</h1>
                    <Button
                        onClick={() => navigate("/users/create")}
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
                    {loading && <p>Loading...</p>}
                    <tbody className="text-center">
                        {users.map((user, i) => (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button
                                        onClick={() =>
                                            navigate(`/users/${user.id}/edit`)
                                        }
                                        className="cursor-pointer"
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
