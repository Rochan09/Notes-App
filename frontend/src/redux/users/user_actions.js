import axios from "axios"
import { LOGIN_USER_ERROR, LOGIN_USER_LOADING, LOGIN_USER_SUCCESS } from "./user_types"
import { API_BASE_URL } from "../../constants/config"
import { toast } from 'react-toastify';

const showToast = (message, type = 'success') => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const getUser = (obj) => async(dispatch) => {
    dispatch({type: LOGIN_USER_LOADING})
    try {
        let data = await axios(API_BASE_URL+"/user/login", {
            method: "post",
            data: obj
        })
        let {message, user, token, status} = data.data
        if(status === 1) {
            showToast(`Welcome back, ${user}!`);
            dispatch({type: LOGIN_USER_SUCCESS, payload: {user, token}})
        }
        else {
            showToast(message || "Invalid credentials", 'error');
            dispatch({type: LOGIN_USER_ERROR})
        }

    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred during login. Please try again.";
        showToast(errorMessage, 'error');
        dispatch({type: LOGIN_USER_ERROR})
    }
}