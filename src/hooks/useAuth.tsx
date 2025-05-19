import { useState } from 'react';
import { useToast } from './useToast';
import { useApiFetch } from './useApiFetch';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { fetchData } = useApiFetch();

    const login = async (username, password) => {
        setLoading(true);
        const payload = { name: username, password };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("rol", data.rol);

                // Obtener roles y permisos
                const rolesAndPermissionsResponse = await fetch(`${import.meta.env.VITE_API_URL}roles/permissions`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.token}`,
                    },
                });

                if (rolesAndPermissionsResponse.ok) {
                    const rolesAndPermissions = await rolesAndPermissionsResponse.json();
                    localStorage.setItem("rolesAndPermissions", JSON.stringify(rolesAndPermissions));
                }
                else {
                    showToast('error', 'Error', 'Hubo un problema al iniciar sesión Relacionado a los Roles y Permisos, Llame a su administrador.');
                }

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