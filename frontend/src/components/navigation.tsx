import logo from "@/assets/logo.jpg";
import avatar from "@/assets/avatar5.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AiFillDashboard } from "react-icons/ai";
import { PiStudent } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/backend/supabase-client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Tables } from "@/backend/database.types";
import { getToken, removeToken } from "@/backend/jtw-storage";

interface NavigationProps {
  active?: "dashboard" | "admin" | "student";
  user: Tables<"users">;
}

export default function Navigation({
  active = "dashboard",
  user,
}: NavigationProps) {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);


  const handleLogout = async () => {
    const promise = new Promise((resolve, reject) => {
      supabase.rpc("logout_user", { _refresh_token: getToken()! }).then((res) => {
        if (res.error) {
          reject(res.error);
        } else {
          resolve(res);
          removeToken();
          navigate({ to: "/" });
        }
      });
    });

    toast.promise(promise, {
      loading: "Loading...",
      success: "Logout successfully",
      error: (promise) => `Error: ${promise.message}`,
    });
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsAdmin(user.role_id === 1);
      } catch (error) {
        console.error("Error checking admin status:", error);
        removeToken();
        navigate({ to: "/" });
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <>
      <aside className="relative z-50 flex flex-col h-screen overflow-y-auto group/sidebar bg-[#343a40] w-60 ">
        <div className="mx-5 my-4">
          <Link to="/dashboard">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={logo} />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>

              <h1 className="ml-4 text-primary-foreground ">
                Western University
              </h1>
            </div>
          </Link>
          <Separator className="my-4 bg-gray-500" />

          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>PF</AvatarFallback>
            </Avatar>

            <h1 className="ml-4 text-primary-foreground ">{user.full_name}</h1>
          </div>
          <Separator className="my-4 bg-gray-500" />

          <div className="flex flex-col gap-1">
            <Link to="/dashboard">
              <div
                className={cn(
                  `flex p-2 rounded-sm cursor-pointer`,
                  active === "dashboard"
                    ? "bg-primary"
                    : "hover:bg-muted-foreground/30"
                )}
              >
                <AiFillDashboard
                  size={25}
                  className="text-primary-foreground"
                />
                <h1 className="ml-4 text-primary-foreground ">Dashboard</h1>
              </div>
            </Link>

            {isAdmin && (
              <Link to="/admin">
                <div
                  className={cn(
                    `flex p-2 rounded-sm cursor-pointer`,
                    active === "admin"
                      ? "bg-primary"
                      : "hover:bg-muted-foreground/30"
                  )}
                >
                  <FaUser size={25} className="text-primary-foreground" />
                  <h1 className="ml-4 text-primary-foreground ">Admin</h1>
                </div>
              </Link>
            )}

            <Link to="/student">
              <div
                className={cn(
                  `flex p-2 rounded-sm cursor-pointer`,
                  active === "student"
                    ? "bg-primary"
                    : "hover:bg-muted-foreground/30"
                )}
              >
                <PiStudent size={25} className="text-primary-foreground" />
                <h1 className="ml-4 text-primary-foreground ">Student</h1>
              </div>
            </Link>

            <div
              className="flex p-2 rounded-sm cursor-pointer hover:bg-muted-foreground/30 "
              onClick={handleLogout}
            >
              <IoIosLogOut size={25} className="text-primary-foreground" />
              <h1 className="ml-4 text-primary-foreground ">Log out</h1>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
