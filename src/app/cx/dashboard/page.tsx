"use client";
import React from "react";
import { signOut } from "next-auth/react";
const cxDashboard = () => {
  return (
    <>
      <div>
        <div>cxDashboard</div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  );
};

export default cxDashboard;
