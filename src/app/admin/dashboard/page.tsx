"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { checkUserSession } from "@/utils/sessionCheck";

const adminDashboard = async () => {
  const session = await checkUserSession();
  console.log(session);
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
