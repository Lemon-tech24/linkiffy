"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  return <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>;
};

export default LogoutButton;
