export interface AuthUser {
    email: string;
    password: string;
}

export interface user {
    id: number;
    name: string;
    email: string;
}

export interface userData {
    user: user;
    token: string;
    refreshToken: string;
}