import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Signuppage from "../pages/Signuppage";
import Loginpage from "../pages/Loginpage";
import Notespage from "../pages/Notespage";
import CreateNotePage from "../pages/CreateNotePage";
import EditNotePage from "../pages/EditNotePage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function AllRoutes({ searchQuery }){
    return <Routes>
        <Route path="/" element={<PublicRoute><Homepage /></PublicRoute>}></Route>
        <Route path="/register" element={<PublicRoute><Signuppage /></PublicRoute>}></Route>
        <Route path="/login" element={<PublicRoute><Loginpage /></PublicRoute>}></Route>
        <Route path="/notes" element={<PrivateRoute><Notespage searchQuery={searchQuery} /></PrivateRoute>}></Route>
        <Route path="/notes/create" element={<PrivateRoute><CreateNotePage /></PrivateRoute>}></Route>
        <Route path="/notes/edit/:id" element={<PrivateRoute><EditNotePage /></PrivateRoute>}></Route>
    </Routes>
}