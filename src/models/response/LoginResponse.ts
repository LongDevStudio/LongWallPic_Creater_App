// models/response/LoginResponse.ts
interface User {
    id: number;
    username: string;
    email: string;
    avatar: string | null;
    is_creator: boolean;
}

interface LoginResponse {
    token: string;
    user: User;
}

export type { User, LoginResponse };
