import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
    const { auth } = useSelector((state) => state.userReducer);
    
    // If user is authenticated, redirect to notes page
    if (auth) {
        return <Navigate to="/notes" replace />;
    }
    
    // If user is not authenticated, show the public content (Homepage)
    return children;
}