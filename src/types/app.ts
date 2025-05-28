export type ServiceResponse<T> = {
    status: string;
    data: T;
};

export type ServiceErrorResponse = {
    message: string | string[];
    error: string;
    status: string;
};