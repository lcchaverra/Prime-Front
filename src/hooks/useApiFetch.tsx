import { useState } from 'react';
import { type ApiError } from '../interface/Api';

export const useApiFetch = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const fetchData = async (endpoint: string, method = 'GET', body = null, customHeaders = {}) => {
        setLoading(true);
        try {
            const headers = { "Authorization": `${token}`, ...customHeaders, };
            const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, { method, headers, body: body ? JSON.stringify(body) : null, });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                // Crear un error estructurado con la información del backend
                const apiError: ApiError = {
                    message: errorData?.message || `Error ${response.status}`, status: errorData?.status || "error", statusCode: response.status };
                throw apiError;
            }

            return await response.json();
        } catch (error) {
            // Si es un ApiError estructurado, lo relanzamos tal como está
            if (error && typeof error === 'object' && 'message' in error) {
                throw error;
            }
            console.error("Error al obtener los datos:", error);
            throw { message: "Error de conexión o servidor", status: "error", statusCode: 500 } as ApiError;
            } 
        finally {
            setLoading(false);
        }
    };

    return { fetchData, loading };
};
