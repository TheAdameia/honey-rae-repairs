import "./App.css"
import { Routes, Route } from "react-router-dom"
import { Login } from "./components/auth/Login.jsx"
import { Register } from "./components/auth/Register.jsx"
import { ApplicationViews } from "./views/ApplicationViews.jsx"
import { Authorized } from "./views/Authorized.jsx"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={
        //checks if the user if authorized, and if so, displays child components (see ApplicationViews).
        // * means "anything". Specifically in this code. it serves the purpose of locking everything but
        // the login and register pages behind authorization.
        <Authorized>
          <ApplicationViews/>
        </Authorized>
      } />

    </Routes>
  )
}