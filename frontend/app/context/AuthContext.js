"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const res = await fetch("https://prepai-6jwi.onrender.com/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.ok) {
                const userData = await res.json();
                setUser(userData);
            } else {
                localStorage.removeItem("token");
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check failed", error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await fetch("https://prepai-6jwi.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Login failed");
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        await checkUser();
        return data;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
