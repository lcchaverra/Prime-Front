import { useState } from 'react';
import { useToast } from './useToast';
import { type AuthUser, type userData, type user } from '../utils/interface/AuthUser';
import type { ServiceResponse } from '../utils/types/app';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const login = async ({email, password}: AuthUser) => {
        setLoading(true);
        const payload = { email, password };
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}auth/login`, { method: "POST", headers: { "Content-Type": "application/json",}, body: JSON.stringify(payload), });
            if (response.ok) {
                const data: ServiceResponse<userData> = await response.json();
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("refreshToken", data.data.refreshToken);
                showToast('success', 'Exitoso', 'Inicio de Sesión exitoso');
                return true;
            } else {
                showToast('error', 'Error', 'Hubo un problema al iniciar sesión. Intenta nuevamente.');
                return false;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            showToast('error', 'Error', 'Hubo un problema al iniciar sesión. Intenta nuevamente.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading };
}

export default useAuth