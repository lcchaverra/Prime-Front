import { type ServiceResponse } from "../types/app";

export const apiFetch = async (endpoint: string, method = 'GET', body = null, customHeaders = {}) => {
    const token = localStorage.getItem('token');
    try {
        const headers = { "Authorization": `${token}`, "Content-Type": "application/json", ...customHeaders, };
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method, headers, body: body ? JSON.stringify(body) : null, });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(`Error: ${errorData?.message || response.status}`);
        }
        const data: ServiceResponse<any> = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
};