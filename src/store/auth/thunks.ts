import { AppDispatch } from "../store";
import { checkingCredentials, login, logout } from "./authSlice";
import { UserLogin } from "../../interfaces/user-auth";
import { toast } from "react-toastify";

const LOGIN_URL = 'https://3eb9444quf.execute-api.us-east-2.amazonaws.com/prod/login';

export const startLoginWithEmailPassword = ({ email, password }: UserLogin) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(checkingCredentials());

            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            const { user: data, message } = await response.json();

            dispatch(login({
                user_id: data.user_id,
                email,
                name: data.name || null,
                session_token: data.session_token
            }));

            toast.success(message);

        } catch (error) {
            console.error('Login error:', error);
            dispatch(logout({
                errorMessage: error instanceof Error ? error.message : 'Error en la autenticación'
            }));
        }
    }
}

