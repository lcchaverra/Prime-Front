import { type ServiceResponse } from "../types/app";
import { type ApiError } from "../interface/Api";

export const apiFetch = async (endpoint: string, method = 'GET', body = null, customHeaders = {}) => {
    const token = localStorage.getItem('token');
    try {
        const headers = { "Authorization": `${token}`, "Content-Type": "application/json", ...customHeaders, };
        const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
            method, headers, body: body ? JSON.stringify(body) : null, });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const apiError: ApiError = {
                message: errorData?.message || `Error ${response.status}`,
                status: errorData?.status || "error",
                statusCode: response.status
            };
            throw apiError;
        }
        const data: ServiceResponse<any> = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
};