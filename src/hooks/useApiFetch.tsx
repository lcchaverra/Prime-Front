import { useState } from 'react';

export const useApiFetch = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const fetchData = async (endpoint, method = 'GET', body = null, customHeaders = {}) => {
        setLoading(true);
        try {
            const isFormData = body instanceof FormData;

            const headers = {
                "Authorization": `${token}`,
                ...customHeaders,
            };

            // Solo agrega Content-Type si no es FormData
            if (!isFormData) {
                headers["Content-Type"] = "application/json";
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                method,
                headers,
                body: body
                    ? isFormData
                        ? body
                        : JSON.stringify(body)
                    : null,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(`Error: ${errorData?.message || response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading };
};
