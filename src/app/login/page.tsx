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
import { Roles } from "@/types/enum/enumExports";
import Image from "next/image";
import googleSVG from "@/assets/auth/google.svg";
import Link from "next/link";
import { compare } from "bcryptjs";

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
    console.log(session); //TODO remove
    if (session) {
      console.log("Session exists"); //TODO remove
      const userRole = session.user.role;
      if (
        userRole === Roles.SUPERADMIN ||
        userRole === Roles.ADMIN ||
        userRole === Roles.EDITOR ||
        userRole === Roles.INVENTORY ||
        userRole === Roles.MARKETER
      ) {
        router.push("/admin/dashboard");
      }
    } else {
      console.log("welcome customer");
      router.push("/cx/dashboard");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLoginSubmit)}>
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
              </CardContent>
            </form>
          </Form>
          <CardContent className="grid mt-0">
            <div className="grid">
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
            </div>
            <div className="grid gap-4">
              <Button
                variant={"outline"}
                onClick={() => {
                  signIn("google", { callbackUrl: "/cx/dashboard" });
                }}
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
