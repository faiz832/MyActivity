import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { Button } from "@/components/ui/button";

export default function UserForm() {
    const { id } = useParams();
    const [users, setUsers] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUsers(data.data);
                })
                .catch(() => setLoading(false));
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (users.id) {
            axiosClient
                .put(`/users/${users.id}`, users)
                .then(() => {
                    navigate("/dashboard/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", users)
                .then(() => {
                    navigate("/dashboard/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {users.id && <h1>Update User: {users.name}</h1>}
            {!users.id && <h1>Create User</h1>}
            <div className="max-w-lg mx-auto">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form action="" onSubmit={onSubmit} className="mt-4">
                        <input
                            value={users.name}
                            onChange={(e) =>
                                setUsers({ ...users, name: e.target.value })
                            }
                            placeholder="Name"
                        />
                        <input
                            value={users.email}
                            onChange={(e) =>
                                setUsers({ ...users, email: e.target.value })
                            }
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(e) =>
                                setUsers({ ...users, password: e.target.value })
                            }
                            placeholder="Password"
                        />
                        <Button>Save</Button>
                    </form>
                )}
            </div>
        </>
    );
}
