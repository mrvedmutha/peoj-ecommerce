"use client";
import { loginButtonProps } from "@/types/auth/loginButtonProps";

const onClick = () => {
  console.log("clicked");
};
export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: loginButtonProps) => {
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
