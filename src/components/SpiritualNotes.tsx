import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookHeartIcon, PlusIcon, XIcon } from 'lucide-react';
import { useDashboardStore } from '@/lib/store';

export function SpiritualNotes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const { dailyState, addSpiritualNote, removeSpiritualNote } = useDashboardStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      addSpiritualNote(title.trim(), content.trim(), tags);
      setTitle('');
      setContent('');
      setTags([]);
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <Card className="w-full col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookHeartIcon className="h-5 w-5 text-blue-500" />
          Spiritual Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <Input
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your spiritual reflection..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Add tags... (Press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
              />
              <Button type="submit">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <XIcon className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </form>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {dailyState.spiritualNotes?.map((note) => (
              <div
                key={note.id}
                className="rounded-lg border p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(note.timestamp), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeSpiritualNote(note.id)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm">{note.content}</p>
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}