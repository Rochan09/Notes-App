import { LOGIN_USER_ERROR, LOGIN_USER_LOADING, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_ERROR, REGISTER_USER_LOADING, REGISTER_USER_SUCCESS } from "./user_types"

// Check localStorage for existing auth data
const getInitialState = () => {
    try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            return {
                token: token,
                user: user,
                auth: true,
                loading: false,
                error: false
            };
        }
    } catch (error) {
        console.error('Error reading from localStorage:', error);
    }
    
    return {
        token: null,
        user: null,
        auth: false,
        loading: false,
        error: false
    };
};

const initialState = getInitialState();

export default function userReducer(state=initialState, action)
{
    const {type, payload} = action
    switch(type)
    {
        case LOGIN_USER_LOADING: {
            return {
                ...state, loading: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            // Save to localStorage
            try {
                localStorage.setItem('token', payload.token);
                localStorage.setItem('user', payload.user);
            } catch (error) {
                console.error('Error saving to localStorage:', error);
            }
            
            return {
                ...state, loading: false, error: false, user: payload.user, token: payload.token, auth: true
            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state, loading: false, error: true
            }
        }
        case LOGOUT: {
            // Clear localStorage
            try {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } catch (error) {
                console.error('Error clearing localStorage:', error);
            }
            
            return {
                token: null,
                user: null,
                auth: false,
                loading: false,
                error: false
            }
        }
        case REGISTER_USER_LOADING: {
            return {
                ...state, loading: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state, loading: false, error: false
            }
        }
        case REGISTER_USER_ERROR: {
            return {
                ...state, loading: false, error: true
            }
        }
        default: {
            return state;
        }
    }
}
