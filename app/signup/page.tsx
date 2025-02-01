"use client";
import axios from "axios";
import { ChangeEventHandler, useState } from "react";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/user", {
                name,
                email,
                password,
            });
            alert("User created successfully!");
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error signing up. Please try again.");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div
                className="block w-full max-w-[400px] p-8 bg-black border border-gray-200 rounded-lg shadow"
            >
                <div>
                    <div className="px-4 mb-6">
                        <div className="text-3xl text-white font-extrabold text-center">
                            Sign up
                        </div>
                    </div>
                    <div className="space-y-4 ">
                        <LabelledInput
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            placeholder="zestware"
                            
                        />
                        <LabelledInput
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            type="email"
                            placeholder="zestware@gmail.com"
                        />
                        <LabelledInput
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            placeholder="password"
                        />
                        <LabelledInput
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Confirm Password"
                            type="password"
                            placeholder="confirm password"
                        />
                        <button
                            onClick={handleSignup}
                            type="button"
                            className="mt-4 w-full text-white bg-transparent border hover:bg-yellow-500 focus:ring-4 focus:ring-gray-300 font-3xl uppercase font-extrabold rounded-lg text-sm px-5 py-2.5"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-white font-semibold">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="bg-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}