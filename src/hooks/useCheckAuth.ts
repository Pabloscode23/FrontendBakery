
import { useAppDispatch, useAppSelector } from "../store/store";
import { Auth } from "../interfaces/user-auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { status, user_id, email, name: displayName } = useAppSelector((state) => state.auth);


    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            try {
                const auth = JSON.parse(authData);
                dispatch({ type: 'auth/login', payload: auth })
            } catch {
                localStorage.removeItem("auth");
            }
        } else {
            dispatch({ type: 'auth/logout' });
        }
    }, [dispatch]);

    const logout = (mess: string | null = null) => {
        dispatch({ type: 'auth/logout', payload: { errorMessage: mess } });
        if (mess) toast.error(mess);
    }

    const login = (authData: Auth) => {
        dispatch({ type: 'auth/login', payload: authData });
    }

    return {
        status,
        user_id,
        email,
        displayName,
        isAuthenticated: status === 'authenticated',
        isNotAuthenticated: status === 'not-authenticated',
        isChecking: status === 'checking',
        logout,
        login
    };
}
