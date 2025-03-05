"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const adminDashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log("Session from adminDashboard"); //TODO remove
  console.log(session); //TODO remove
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
