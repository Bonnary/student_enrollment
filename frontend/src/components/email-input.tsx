import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"

export default function EmailInput({name = "email"}:{name?:string}) {
  return (
    <div className="relative w-full max-w-sm">
      <Input
        type="email"
        placeholder="Email"
        className="pr-10 placeholder-gray-400"
        name={name}
      />
      <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
    </div>
  );
}