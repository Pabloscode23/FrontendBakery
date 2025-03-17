import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../../interfaces/user-auth";


const initialState: Auth = {
    session_token: null,
    status: 'checking',
    user_id: null,
    name: null,
    email: null,
    errorMessage: null,
};

// Save login to localStorage
const saveLogin = (state: Auth) => {

    const authData = {
        status: state.status,
        email: state.email,
        session_token: state.session_token,
        name: state.name,
        user_id: state.user_id
    };

    try {
        const serializedState = JSON.stringify(authData);
        localStorage.setItem('auth', serializedState);
    } catch {
        console.error('Error al guardar el carrito');
    }
};

// clear login from localStorage
const clearLogin = () => {
    localStorage.removeItem('auth');
};

// Load login from localStorage
const loadLogin = () => {
    const authData = localStorage.getItem('auth');
    if (authData) {
        try {
            return JSON.parse(authData);
        } catch {
            clearLogin();
        }
    }
    return null;
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.user_id = payload.user_id;
            state.name = payload.name;
            state.email = payload.email;
            state.session_token = payload.session_token;
            state.errorMessage = null;
            saveLogin(state);
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user_id = null;
            state.name = null;
            state.email = null;
            state.session_token = null;
            state.errorMessage = payload?.errorMessage;
            clearLogin();
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
            // Load login from localStorage
            const authData = loadLogin();
            if (authData) {
                state.status = authData.status;
                state.user_id = authData.user_id;
                state.name = authData.name;
                state.email = authData.email;
                state.session_token = authData.session_token;
            } else {
                state.status = 'not-authenticated';
            }
        }
    },
});


export const { login, logout, checkingCredentials } = authSlice.actions;