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
import { User } from "@supabase/supabase-js";
import { logoutIfNotUser } from "@/backend/utility-function";

interface NavigationProps {
  active?: "dashboard" | "admin" | "student";
  user: User;
}

export default function Navigation({
  active = "dashboard",
  user,
}: NavigationProps) {
  const navaction = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  console.log(user);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      navaction({ to: "/" });
    }
  };

  const checkAdmin = async () => {
    console.log(user.id);

    const { data, error } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", user?.id as string)
      .eq("role_id", 1);

    if (error) {
      toast.error(error.message);
    }

    return data;
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminData = await checkAdmin();
        setIsAdmin(adminData !== null && adminData.length > 0);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    logoutIfNotUser({ user });
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

            <h1 className="ml-4 text-primary-foreground ">
              {user?.user_metadata.full_name}
            </h1>
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
