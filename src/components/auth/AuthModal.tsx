import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { z } from "zod"
 
const AuthModal = () => {
  const isAuthenticated = false; // Replace with your authentication logic

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" /> // Redirect to home if authenticated
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img src="/public/assets/images/side-img.svg" alt="logo"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"/>
        </>
      )}
    </>
  );
};

export default AuthModal;
