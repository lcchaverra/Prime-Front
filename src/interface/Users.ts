export interface UserForm {
    id: number | null;
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    active: boolean;
    createdAt: string;
}