"use client";
import React from "react";
import { signOut } from "next-auth/react";

const adminDashboard = async () => {
  return (
    <>
      <div>
        <div>adminDashboard</div>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  );
};

export default adminDashboard;
