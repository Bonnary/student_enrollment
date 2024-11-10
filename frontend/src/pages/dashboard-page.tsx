import { Tables } from "@/backend/database.types";
import Navigation from "@/components/navigation";


export default function DashboardPage({ user }: { user:  Tables<'users'>}) {
  return (
    
      <div className="h-full flex dark:bg-[#1F1F1F]">
        <Navigation user={user}/>

        <main className="flex-1 h-full overflow-y-auto">
          <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1>Document</h1>
          </div>
        </main>
      </div>
  );
}
