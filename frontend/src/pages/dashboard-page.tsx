// src/pages/dashboard-page.tsx
import { useEffect, useState } from "react";
import { Tables } from "@/backend/database.types";
import Navigation from "@/components/navigation";
import { supabase } from "@/backend/supabase-client";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface StatsData {
  label: string;
  value: number;
}

export default function DashboardPage({ user }: { user: Tables<"users"> }) {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    subjects: [] as StatsData[],
    colleges: [] as StatsData[],
    generations: [] as number[],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);

        // Fetch all student data in one query
        const { data: students, error } = await supabase
          .rpc("get_student")
          .select("subject, college, generation");

        if (error) throw error;

        // Process subject stats
        const subjectCounts = students?.reduce(
          (acc, curr) => {
            acc[curr.subject] = (acc[curr.subject] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        // Process college stats
        const collegeCounts = students?.reduce(
          (acc, curr) => {
            acc[curr.college] = (acc[curr.college] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

        // Process generation trends
        const generations = students?.reduce(
          (acc, curr) => {
            acc[curr.generation] = (acc[curr.generation] || 0) + 1;
            return acc;
          },
          {} as Record<number, number>
        );

        // Convert to arrays and sort
        const genArray = Object.entries(generations || {})
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([_, count]) => count);

        setStats({
          subjects: Object.entries(subjectCounts || {}).map(
            ([label, value]) => ({
              label,
              value,
            })
          ),
          colleges: Object.entries(collegeCounts || {}).map(
            ([label, value]) => ({
              label,
              value,
            })
          ),
          generations: genArray,
        });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch statistics"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation user={user} />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Students by Major</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {stats.subjects.length > 0 ? (
                <PieChart data={stats.subjects} width={400} height={300} />
              ) : (
                <p className="text-muted-foreground">No data available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Students by College</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {stats.colleges.length > 0 ? (
                <BarChart data={stats.colleges} width={400} height={300} />
              ) : (
                <p className="text-muted-foreground">No data available</p>
              )}
            </CardContent>
          </Card>

          {/* <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Enrollment Trends by Generation</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {stats.generations.length > 0 ? (
                <LinePlot
                  data={stats.generations}
                  width={800}
                  height={300}
                  marginLeft={60}
                  marginBottom={40}
                />
              ) : (
                <p className="text-muted-foreground">No data available</p>
              )}
            </CardContent>
          </Card> */}
        </div>
      </main>
    </div>
  );
}
