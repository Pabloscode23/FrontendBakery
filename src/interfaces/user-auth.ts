
export interface UserLogin {
    email: string;
    password: string;
}

export interface Auth {
    status: 'authenticated' | 'not-authenticated' | 'checking';
    uid: number | null;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    errorMessage?: string | null;
}

