import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HeartHandshakeIcon, PlusIcon, XIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function CharityTracker() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const { dailyState, addCharityDonation, removeCharityDonation } = useDashboardStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && description.trim()) {
      addCharityDonation(numAmount, description.trim());
      setAmount('');
      setDescription('');
    }
  };

  const charities = dailyState.charityDonations || [];

  const total = charities.reduce((acc, charity) => acc + charity.amount, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartHandshakeIcon className="h-5 w-5 text-purple-500" />
          Charity Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button type="submit" size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </form>
        <div className="text-sm font-medium mb-4">
          Total Donations: ${total.toFixed(2)}
        </div>
        <ScrollArea className="h-[200px] pr-4">
          <div className="space-y-2">
            {charities.length > 0 ? (
              charities.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-start justify-between gap-2 rounded-lg border p-3"
                >
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">
                        ${donation.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(donation.timestamp), 'h:mm a')}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {donation.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeCharityDonation(donation.id)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p>No donations available.</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}