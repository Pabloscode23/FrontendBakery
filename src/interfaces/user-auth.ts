
export interface UserLogin {
    email: string;
    password: string;
}

export interface Auth {
    session_token: string | null;
    status: 'authenticated' | 'not-authenticated' | 'checking';
    user_id: string | null;
    name: string | null;
    email: string | null;
    errorMessage?: string | null;
}

