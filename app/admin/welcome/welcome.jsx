"use client"
import React, { useEffect, useState } from "react";

export default function Welcome() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const user = JSON.parse(localStorage?.getItem("user"));
      setUserData(user);
    }
  }, []);
  return (
    <a className="navbar-brand ps-3" id="Welcome-per" href="#">
      Bienvenido {userData?.Nombre} {userData?.Apellido} 
    </a>
  );
}
