import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { token, setUser, setToken } = useStateContext();

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    if (localStorage.getItem("ACCESS_TOKEN")) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            <h1>Login</h1>
            <form action="" onSubmit={submit}>
                <div className="flex flex-col gap-4 p-4">
                    <input ref={emailRef} type="email" placeholder="email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                    />
                    <Button className="cursor-pointer">Login</Button>
                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-gray-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
