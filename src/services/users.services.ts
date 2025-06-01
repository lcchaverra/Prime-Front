import { apiFetch } from "./Api";

export const getUsers = async () => {
        try {
        const data = await apiFetch("users", "GET");
        if (data) return data.data || [];
        } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        throw error;
    }
};

export const saveUser = async (user: any) => {
    try {
        await apiFetch(`users${user.id ? `/${user.id}` : ""}`, user.id ? "PUT" : "POST", user);
        return true;
    } catch (error) {
        console.error("Error al guardar el usuario:", error);
        throw error;
    }
};

export const editUser = async (user: any) => {
    try {
        await apiFetch(`users/${user.id}`, "PUT", user);
        return true;
    } catch (error) {
        console.error("Error al editar el usuario:", error);
        throw error;
    }
};

export const deleteUser = async (userId: number) => {
    try {
        await apiFetch(`users/${userId}`, "DELETE");
        return true;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error;
    }
};