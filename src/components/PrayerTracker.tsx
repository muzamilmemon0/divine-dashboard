import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { HeartIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function PrayerTracker() {
  const { dailyState, togglePrayer } = useDashboardStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartIcon className="h-5 w-5" />
          Prayer Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {dailyState.prayers.map((prayer) => (
            <div
              key={prayer.name}
              className="flex items-center justify-between space-x-2"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={prayer.name}
                  checked={prayer.completed}
                  onCheckedChange={() => togglePrayer(prayer.name)}
                />
                <label
                  htmlFor={prayer.name}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {prayer.name}
                </label>
              </div>
              <span className="text-sm text-muted-foreground">{prayer.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}