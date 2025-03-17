import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { startLoginWithEmailPassword } from "../store/auth/thunks";

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { status, user_id, email, name: displayName } = useAppSelector((state) => state.auth);

    useEffect(() => {

        // Check if we have auth data in localStorage
        const authData = localStorage.getItem('auth');
        if (authData) {
            try {
                const { email, password } = JSON.parse(authData);
                dispatch(startLoginWithEmailPassword({ email, password }));
            } catch {
                localStorage.removeItem('auth');
            }
        }
    }, [dispatch]);

    return {
        status,
        user_id,
        email,
        displayName,
        isAuthenticated: status === 'authenticated',
        isNotAuthenticated: status === 'not-authenticated',
        isChecking: status === 'checking'
    };
}
