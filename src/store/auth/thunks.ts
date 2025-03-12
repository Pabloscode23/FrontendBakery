import { AppDispatch } from "../store";
import { checkingCredentials, login, logout } from "./authSlice";
import { UserLogin } from "../../interfaces/user-auth";

const API_URL = 'http://localhost:3000/api';

export const startLoginWithEmailPassword = ({ email, password }: UserLogin) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(checkingCredentials());
            
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            const data = await response.json();
            
            dispatch(login({
                uid: Number(data.uid),
                email,
                displayName: data.displayName || null,
                photoURL: data.photoURL || null
            }));
            
        } catch (error) {
            console.error('Login error:', error);
            dispatch(logout({ 
                errorMessage: error instanceof Error ? error.message : 'Error en la autenticación' 
            }));
        }
    }
}

export const startLogout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(checkingCredentials());
            
            const response = await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }

            dispatch(logout({}));
        } catch (error) {
            console.error('Logout error:', error);
            dispatch(logout({ 
                errorMessage: error instanceof Error ? error.message : 'Error al cerrar sesión' 
            }));
        }
    }
}