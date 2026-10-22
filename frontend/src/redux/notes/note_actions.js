import axios from "axios"
import { store } from "../store"
import { CREATE_NOTES_ERROR, CREATE_NOTES_LOADING, CREATE_NOTES_SUCCESS, DELETE_NOTES_ERROR, DELETE_NOTES_LOADING, DELETE_NOTES_SUCCESS, GET_NOTES_ERROR, GET_NOTES_LOADING, GET_NOTES_SUCCESS, UPDATE_NOTE_LOCAL, UPDATE_NOTES_ERROR, UPDATE_NOTES_LOADING, UPDATE_NOTES_SUCCESS } from "./note_types"
import { API_BASE_URL } from "../../constants/config"
import { LOGOUT } from "../users/user_types"
import { toast } from 'react-toastify';

const handleTokenError = (dispatch) => {
    toast.error("Session expired. Please login again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    dispatch({type: LOGOUT});
};

const handleError = (error, dispatch, actionType, defaultMessage) => {
    console.error("Error:", error);
    const errorMessage = error.response?.data?.message || defaultMessage;
    toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    dispatch({type: actionType});
};

export const getNotes = (options = {})=>async(dispatch)=>{
    const {token} = store.getState().userReducer
    if (!token) {
        handleTokenError(dispatch);
        return;
    }
    
    if (!options.silent) {
        dispatch({type: GET_NOTES_LOADING})
    }
    try {
        const res = await axios(API_BASE_URL+"/note", {
            method: "get",
            headers: {
                Authorization: token
            }
        })
        const {status, message, data} = res.data
        if(status === 1) {
            dispatch({type: GET_NOTES_SUCCESS, payload: data})
        } else if(status === 2) {
            handleTokenError(dispatch);
        } else {
            handleError({response: {data: {message}}}, dispatch, GET_NOTES_ERROR, "Failed to fetch notes");
        }
    } catch (error) {
        handleError(error, dispatch, GET_NOTES_ERROR, "Failed to fetch notes. Please try again.");
    }
}

export const createNotes = (obj)=>async(dispatch)=>{
    const {token} = store.getState().userReducer
    if (!token) {
        handleTokenError(dispatch);
        return;
    }

    dispatch({type: CREATE_NOTES_LOADING})
    try {
        const res = await axios(API_BASE_URL+"/note/create", {
            method: "post",
            data: obj,
            headers: {
                Authorization: token
            }
        })
        const {status, message} = res.data
        if(status === 1) {
            toast.success("Note created successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({type: CREATE_NOTES_SUCCESS})
            dispatch(getNotes({ silent: options.silent }))
        } else if(status === 2) {
            handleTokenError(dispatch);
        } else {
            handleError({response: {data: {message}}}, dispatch, CREATE_NOTES_ERROR, "Failed to create note");
        }
    } catch (error) {
        handleError(error, dispatch, CREATE_NOTES_ERROR, "Failed to create note. Please try again.");
    }
}

export const updateNotes = (id, obj, options = {})=>async(dispatch)=>{
    const {token} = store.getState().userReducer
    if (!token) {
        handleTokenError(dispatch);
        return false;
    }

    if (!options.silent) {
        dispatch({type: UPDATE_NOTES_LOADING})
    }
    try {
        const res = await axios(API_BASE_URL+"/note/", {
            method: "patch",
            data: obj,
            headers: {
                Authorization: token,
                id: id
            }
        })
        const {status, message} = res.data
        if(status === 1) {
            if (!options.silent) {
                toast.success("Note updated successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            if (options.silent) {
                dispatch({
                    type: UPDATE_NOTE_LOCAL,
                    payload: { id, changes: obj }
                })
            } else {
                dispatch({type: UPDATE_NOTES_SUCCESS})
                dispatch(getNotes())
            }
            return true;
        } else if(status === 2) {
            handleTokenError(dispatch);
            return false;
        } else {
            handleError({response: {data: {message}}}, dispatch, UPDATE_NOTES_ERROR, "Failed to update note");
            return false;
        }
    } catch (error) {
        handleError(error, dispatch, UPDATE_NOTES_ERROR, "Failed to update note. Please try again.");
        return false;
    }
}

export const deleteNotes = (id)=>async(dispatch)=>{
    const {token} = store.getState().userReducer
    if (!token) {
        handleTokenError(dispatch);
        return;
    }

    dispatch({type: DELETE_NOTES_LOADING})
    try {
        const res = await axios(API_BASE_URL+"/note/", {
            method: "delete",
            headers: {
                Authorization: token,
                id: id
            }
        })
        const {status, message} = res.data
        if(status === 1) {
            toast.success("Note deleted successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({type: DELETE_NOTES_SUCCESS})
            dispatch(getNotes())
        } else if(status === 2) {
            handleTokenError(dispatch);
        } else {
            handleError({response: {data: {message}}}, dispatch, DELETE_NOTES_ERROR, "Failed to delete note");
        }
    } catch (error) {
        handleError(error, dispatch, DELETE_NOTES_ERROR, "Failed to delete note. Please try again.");
    }
}