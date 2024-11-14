import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshakeIcon, RefreshCcwIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function DhikrCounter() {
  const { dailyState, incrementDhikr, resetDhikr } = useDashboardStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartHandshakeIcon className="h-5 w-5" />
          Dhikr Counter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{dailyState.dhikrCount}</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              className="w-32"
              onClick={incrementDhikr}
            >
              Count
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={resetDhikr}
            >
              <RefreshCcwIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}