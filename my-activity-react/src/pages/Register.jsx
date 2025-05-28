import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextProvider";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const submit = (e) => {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/register", payload)
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
            <h1>Register</h1>
            <form onSubmit={submit}>
                <div className="flex flex-col gap-4 p-4">
                    <input ref={nameRef} type="text" placeholder="name" />
                    <input ref={emailRef} type="email" placeholder="email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                    />
                    <Button className="cursor-pointer">Register</Button>
                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-gray-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
