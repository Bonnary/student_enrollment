import { useEffect, useState } from "react";
import { redirect } from "@tanstack/react-router";
import { supabase } from "@/backend/supabase-client";
import { User } from "@supabase/supabase-js"; // Make sure to import the User type

const useUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await useUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user === null) {
      redirect({ to: "/" });
    }
  }, [user]);

  if (user === undefined) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return <>{children}</>;
}
