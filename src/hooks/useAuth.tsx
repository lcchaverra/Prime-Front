import { useState } from 'react';
import { type AuthUser, type userData, type user } from '../interface/AuthUser';
import type { ServiceResponse } from '../types/app';

const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const login = async ({email, password}: AuthUser) => {
        setLoading(true);
        const payload = { email, password };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, { method: "POST", headers: { "Content-Type": "application/json",}, body: JSON.stringify(payload), });
            if (response.ok) {
                const data: ServiceResponse<userData> = await response.json();
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("refreshToken", data.data.refreshToken);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                return true;
            } else {
                console.error("Error en la solicitud:", response);
                return false;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
}

export default useAuth