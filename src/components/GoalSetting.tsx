import { useState } from 'react';
import { format, isAfter } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TargetIcon, CheckIcon, XIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';
import type { Goal } from '@/lib/store';

const categories = [
  { value: 'prayer', label: 'Prayer' },
  { value: 'quran', label: 'Quran' },
  { value: 'dhikr', label: 'Dhikr' },
  { value: 'charity', label: 'Charity' },
  { value: 'other', label: 'Other' },
] as const;

export function GoalSetting() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Goal['category']>('other');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [progress, setProgress] = useState('');

  const {
    dailyState,
    addGoal,
    updateGoalProgress,
    removeGoal,
    toggleGoalCompletion,
  } = useDashboardStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && target && deadline) {
      addGoal(title.trim(), category, Number(target), deadline);
      setTitle('');
      setCategory('other');
      setTarget('');
      setDeadline('');
    }
  };

  const handleProgressUpdate = (id: string, value: string) => {
    setProgress(value);
    updateGoalProgress(id, Number(value));
  };

  const isOverdue = (deadline: string) => {
    return isAfter(new Date(), new Date(deadline));
  };

  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TargetIcon className="h-5 w-5 text-yellow-500" />
          Goal Setting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Goal title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="col-span-2"
          />
          <Select
            value={category}
            onValueChange={(value: Goal['category']) => setCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Target value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            min="0"
          />
          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="col-span-2"
          />
          <Button type="submit" className="col-span-2">
            Add Goal
          </Button>
        </form>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {dailyState.goals?.length > 0 ? (
              dailyState.goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`rounded-lg border p-4 space-y-3 ${
                    goal.completed
                      ? 'bg-green-50 dark:bg-green-950/20'
                      : isOverdue(goal.deadline)
                      ? 'bg-red-50 dark:bg-red-950/20'
                      : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <div className="flex gap-2 items-center">
                        <Badge variant="outline">{goal.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Due: {format(new Date(goal.deadline), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleGoalCompletion(goal.id)}
                      >
                        <CheckIcon
                          className={`h-4 w-4 ${
                            goal.completed ? 'text-green-500' : ''
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeGoal(goal.id)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {goal.current} / {goal.target}</span>
                      <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                    </div>
                    <Progress
                      value={(goal.current / goal.target) * 100}
                      className="h-2"
                    />
                    <Input
                      type="number"
                      placeholder="Update progress"
                      value={goal.id === progress ? progress : ''}
                      onChange={(e) => handleProgressUpdate(goal.id, e.target.value)}
                      min="0"
                      max={goal.target}
                      className="mt-2"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>No goals available.</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}