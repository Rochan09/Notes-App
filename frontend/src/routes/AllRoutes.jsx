import { Route, Routes } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Signuppage from "../pages/Signuppage";
import Loginpage from "../pages/Loginpage";
import Notespage from "../pages/Notespage";
import CreateNotePage from "../pages/CreateNotePage";
import EditNotePage from "../pages/EditNotePage";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes({ searchQuery }){
    return <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<Signuppage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>
        <Route path="/notes" element={<PrivateRoute><Notespage searchQuery={searchQuery} /></PrivateRoute>}></Route>
        <Route path="/notes/create" element={<PrivateRoute><CreateNotePage /></PrivateRoute>}></Route>
        <Route path="/notes/edit/:id" element={<PrivateRoute><EditNotePage /></PrivateRoute>}></Route>
    </Routes>
}