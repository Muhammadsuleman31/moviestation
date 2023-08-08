import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginForm from "./LoginForm/LoginForm"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utensils/Privateroutes"
import SignupForm from "./SignupForm/SignupForm"
import AuthState from "./utensils/AuthState"
import Form from './Form/Form';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthState>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
        <Route path="/"  element={<App />}/>  
        </Route>
       <Route exact path="/signup"  element={<SignupForm />}/>
       <Route exact path="/login"  element={<LoginForm />} />
       <Route exact path="/addmovie"  element={<Form />} />

     </Routes>

</BrowserRouter>
</AuthState>
);
