// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';

// const ProtectedRoutes = () => {
//   const user = sessionStorage.getItem('id');
//   return user ? <Outlet /> : <Navigate to="/signin" />;
// };

// export default ProtectedRoutes;

// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';

// const ProtectedRoutes = () => {
//   const user = sessionStorage.getItem('id');
//   return user ? <Outlet /> : <Navigate to="/signin" />;
// };

// export default ProtectedRoutes;





// import React, { useEffect, useState } from "react";
// import { Outlet, Navigate } from "react-router-dom";

// const ProtectedRoutes = () => {
//   const [user, setUser] = useState<boolean>(localStorage.getItem("id") !== null);

//   useEffect(() => {
//     const checkAuthStatus = () => {
//       setUser(localStorage.getItem("id") !== null);
//     };

//     // Listen for changes to authentication status across tabs
//     window.addEventListener("storage", checkAuthStatus);
//     return () => window.removeEventListener("storage", checkAuthStatus);
//   }, []);

//   return user ? <Outlet /> : <Navigate to="/signin" replace />;
// };

// export default ProtectedRoutes;






import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // Use localStorage instead of sessionStorage
  const [user, setUser] = useState<boolean>(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkAuthStatus = () => {
      setUser(localStorage.getItem("isAuthenticated") === "true");
    };

    // Listen for authentication changes across tabs
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;


