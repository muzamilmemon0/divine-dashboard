import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeartHandshakeIcon, PlusIcon, XIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function GoodDeedsTracker() {
  const [newDeed, setNewDeed] = useState('');
  const { dailyState, addGoodDeed, removeGoodDeed } = useDashboardStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDeed.trim()) {
      addGoodDeed(newDeed.trim());
      setNewDeed('');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartHandshakeIcon className="h-5 w-5 text-emerald-500" />
          Good Deeds
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter a good deed..."
            value={newDeed}
            onChange={(e) => setNewDeed(e.target.value)}
          />
          <Button type="submit" size="icon">
            <PlusIcon className="h-4 w-4" />
          </Button>
        </form>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {dailyState.goodDeeds?.map((deed) => (
              <div
                key={deed.id}
                className="flex items-start justify-between gap-2 rounded-lg border p-3"
              >
                <div className="flex-1">
                  <p className="text-sm">{deed.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(deed.timestamp), 'h:mm a')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => removeGoodDeed(deed.id)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )) || <p>No good deeds available.</p>}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}