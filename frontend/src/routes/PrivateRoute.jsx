import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
    const {auth} = useSelector((state)=>state.userReducer)
    if(auth)
    return children
    return <Navigate to="/login" replace />
}