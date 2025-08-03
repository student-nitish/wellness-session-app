import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import MySessions from "./pages/mySession";
import Home from "./pages/Home";
import EditorWrapper from "./pages/EditorWrapper";
import CreateSession from "./pages/CreateSession";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-sessions" element={<MySessions/>}/>
        <Route path="/edit/:id" element={<EditorWrapper/>} />
         <Route path="/create" element={<CreateSession/>} />
      </Routes>
    
  );
}

export default App;
