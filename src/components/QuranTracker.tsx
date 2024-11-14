import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpenIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function QuranTracker() {
  const { dailyState, setQuranPages, setQuranMinutes } = useDashboardStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5" />
          Quran Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pages">Pages Read</Label>
            <Input
              id="pages"
              type="number"
              min="0"
              value={dailyState.quranPages}
              onChange={(e) => setQuranPages(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minutes">Minutes Spent</Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              value={dailyState.quranMinutes}
              onChange={(e) => setQuranMinutes(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}