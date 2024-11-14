import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function DailyImaanTracker() {
  const { dailyState, setImaanLevel, setNote } = useDashboardStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartIcon className="h-5 w-5 text-red-500" />
          Daily Imaan Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Low</span>
              <span>High</span>
            </div>
            <Slider
              value={[dailyState.imaanLevel]}
              onValueChange={(value) => setImaanLevel(value[0])}
              max={10}
              step={1}
              className="w-full"
            />
            <div className="text-center text-sm text-muted-foreground">
              Level: {dailyState.imaanLevel}/10
            </div>
          </div>
          <Textarea
            placeholder="Write your spiritual reflection for today..."
            value={dailyState.note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}