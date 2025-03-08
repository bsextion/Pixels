import React from "react";
import "./globals.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/auth/Forms/LoginForm";
import RegisterForm from "./components/auth/Forms/RegisterForm";
import { AllUsers, CreatePost, EditPost, EditProfile, Explore, Home, Layout, PostDetails, Profile, Saved } from "./components/pages";
import AuthModal from "./components/auth/AuthModal";


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes, uses the authmodal as layout and displays Forms */}
        <Route element={<AuthModal />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        {/* private routes*/}
        <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/saved" element={<Saved/>} />
        <Route path="/all-users" element={<AllUsers/>} />
        <Route path="/create-post" element={<CreatePost/>} />
        <Route path="/edit-post/:id" element={<EditPost/>} />
        <Route path="/post/:id" element={<PostDetails/>} />
        <Route path="/profile/:id/*" element={<Profile/>} />
        <Route path="/edit-profile/:id" element={<EditProfile/>} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
