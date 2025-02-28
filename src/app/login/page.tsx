"use client";
import { signIn, getSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "@/app/globals.css";
import { loginSchema } from "@/Schemas/auth/loginSchema";
import { Roles } from "@/types/enum/enumUser";
import Image from "next/image";
import googleSVG from "@/assets/auth/google.svg";

type FormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [errMessage, setErrMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onLoginSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrMessage(null);
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    setIsLoading(false);

    if (res?.error) {
      setErrMessage("Invalid email or password");
      return;
    }
    const session = await getSession();

    if (session) {
      const userRole = session.user.role;
      if (
        userRole ===
        (Roles.ADMIN ||
          Roles.MARKETER ||
          Roles.INVENTORY ||
          Roles.EDITOR ||
          Roles.SUPERADMIN)
      ) {
        router.push("/admin/dashboard");
      }
    } else {
      router.push("/cx/dashboard");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLoginSubmit)}>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>
                  Enter your credentials below to login your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {errMessage && (
                  <div className="text-red-500 text-center text-sm">
                    {errMessage}
                  </div>
                )}
                <div className="grid gap-2 my-2">
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Email Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Login"}
                  </Button>
                </div>
                {/* <div className="grid gap-2">
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-gray-400"></div>
                  <span className="flex-shrink mx-4 text-gray-400">OR</span>
                  <div className="flex-grow border-t border-gray-400"></div>
                </div>
              </div>
              <div className="grid gap-2">
                <Button
                  variant={"outline"}
                  onSubmit={() =>
                    signIn("google", { callbackUrl: "/cx/dashboard" })
                  }
                >
                  <span className="flex">
                    <Image
                      src={googleSVG}
                      alt="Google Logo"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    Login with Google
                  </span>
                </Button>
              </div> */}
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
};

export default Login;
