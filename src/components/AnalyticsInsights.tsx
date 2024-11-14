import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays, startOfDay, isWithinInterval } from 'date-fns';
import { LineChartIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

interface ChartData {
  date: string;
  value: number;
}

export function AnalyticsInsights() {
  const { dailyState } = useDashboardStore();

  // Helper function to get data for the last 7 days
  const getLast7DaysData = (data: any[], valueKey: string): ChartData[] => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = startOfDay(subDays(new Date(), i));
      return {
        date: format(date, 'MMM d'),
        value: data.filter((item) =>
          isWithinInterval(new Date(item.timestamp), {
            start: date,
            end: new Date(date.setHours(23, 59, 59, 999)),
          })
        ).length,
      };
    }).reverse();
    return last7Days;
  };

  // Calculate prayer completion rate
  const prayerCompletionRate =
    (dailyState.prayers.filter((prayer) => prayer.completed).length /
      dailyState.prayers.length) *
    100;

  // Get data for different metrics
  const goodDeedsData = getLast7DaysData(dailyState.goodDeeds, 'count');
  const charityData = getLast7DaysData(dailyState.charityDonations, 'amount');
  const notesData = getLast7DaysData(dailyState.spiritualNotes, 'count');

  // Calculate goals progress
  const completedGoals = dailyState.goals.filter((goal) => goal.completed).length;
  const totalGoals = dailyState.goals.length;
  const goalsProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-2 shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm">Count: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5 text-indigo-500" />
          Analytics & Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">
                    Prayer Completion
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {Math.round(prayerCompletionRate)}%
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">
                    Dhikr Count
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {dailyState.dhikrCount}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">
                    Quran Pages
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {dailyState.quranPages}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium">
                    Goals Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">
                    {Math.round(goalsProgress)}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-4">Good Deeds Trend</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={goodDeedsData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--chart-1))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-4">Spiritual Notes Activity</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={notesData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--chart-2))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-4">Charity Donations</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={charityData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--chart-3))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">
                      Completed Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">{completedGoals}</div>
                    <p className="text-sm text-muted-foreground">
                      out of {totalGoals} total goals
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium">
                      Goals by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      {['prayer', 'quran', 'dhikr', 'charity', 'other'].map(
                        (category) => (
                          <div
                            key={category}
                            className="flex justify-between items-center"
                          >
                            <span className="capitalize">{category}</span>
                            <span className="font-medium">
                              {
                                dailyState.goals.filter(
                                  (goal) => goal.category === category
                                ).length
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}