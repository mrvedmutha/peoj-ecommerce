import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/loginButton";

export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-gray-950">
        <LoginButton>
          <Button variant="secondary">Login</Button>
        </LoginButton>
      </main>
    </>
  );
}
