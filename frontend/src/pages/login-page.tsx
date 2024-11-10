import logo from "@/assets/logo.jpg";
import { setToken } from "@/backend/jtw-storage";
import { supabase } from "@/backend/supabase-client";
import EmailInput from "@/components/email-input";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";

import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();

  const onLogin = async (e: any) => {
    e.preventDefault();

    const promise = new Promise((resolve, reject) => {
      supabase
        .rpc("login_user", {
          _email: e.target.email.value,
          _password: e.target.password.value,
        })
        .then((res) => {
          if (res.error) {
            reject(res.error);
          } else {
            resolve(res);
            setToken(res.data[0].refresh_token);
            navigate({ to: "/dashboard" });
          }
        });
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Login successfully",
      error: (promise) => `Error: ${promise.message}`,
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#e9ecef]">
        <img src={logo} alt="logo" className="max-w-[200px] max-h-[200px]" />
        <form
          onSubmit={onLogin}
          className="bg-white p-5 shadow-md w-full max-w-[319px] flex flex-col gap-4 items-center justify-center"
        >
          <h1>Sign in to start your session</h1>
          <EmailInput />
          <PasswordInput />

          {/* <div className="flex items-start w-full space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember Me</Label>
          </div> */}

          <Button type="submit" className="w-full bg-primary">
            Login
          </Button>

          <div className="flex justify-start w-full">
            <Button
              variant="link"
              onClick={() => navigate({ to: "/forgot-password" })}
            >
              I forgot password
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
