import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name = "password",
}: {
  name?: string;
 
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full ">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        className="pr-10 placeholder-gray-400"
        name={name}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5 text-gray-400" />
        ) : (
          <Eye className="w-5 h-5 text-gray-400" />
        )}
      </Button>
    </div>
  );
}
