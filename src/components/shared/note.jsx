import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Trash } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { CalendarDays } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { useRef, useState } from 'react';

const Note = ({ note, notes, setNotes }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(note);
  const inputRef = useRef();

  const handleEdit = () => {
    setEdit(true);
    inputRef.current.focus();
  };

  const handleSave = () => {
    setEdit(false);
    setNotes([...notes.filter(n => n !== note), inputRef.current.value]);
    setValue(inputRef.current.value);
  };

  const handleKeypress = e => {
    if (!edit) return;
    if (e.key === 'Escape' || e.key === 'Enter') {
      handleSave();
    }
  };
  return (
    <div className="flex items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Input value={value} placeholder="Enter Note" readOnly={!edit} ref={inputRef} onInput={e => setValue(e.target.value)} onKeyDown={handleKeypress} onBlur={handleSave} />
        </HoverCardTrigger>
        {!edit && value && value.trim() !== '' && (
          <HoverCardContent side="top" className="w-80">
            <div className="flex gap-2 items-start space-x-4">
              <Button variant="outline" className="p-2 w-auto h-auto">
                <Trash className="w-4 h-4 text-red-600" />
              </Button>
              <div className="space-y-1">
                <p className="text-sm">{value}</p>
                <div className="flex items-center pt-4">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" /> <span className="text-xs text-muted-foreground">Added on December 2023</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
      {!edit && (
        <Button size="icon" variant="outline" onClick={handleEdit} className="absolute right-4">
          <Pencil className="w-4 h-4"></Pencil>
        </Button>
      )}
    </div>
  );
};

export const Notes = ({ notes: data = [] }) => {
  const [notes, setNotes] = useState(data);
  const addNote = () => {
    setNotes([...notes, '']);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="max-w-32 justify-start overflow-hidden relative">
            {notes[0] || 'Add Note'}
            <div className="__line absolute bottom-0 h-[1px] inset-x-0"></div>
          </Button>
          {!!notes.length && <Badge>{notes.length}+</Badge>}
        </div>
      </PopoverTrigger>
      <PopoverContent side="top">
        <div className="grid gap-4">
          <div className="space-y-2 pb-2 border-b">
            <h4 className="font-medium leading-none">Notes</h4>
            <p className="text-sm text-muted-foreground">View and edit your notes.</p>
          </div>

          <div className="grid gap-2">
            {notes.map((note, index) => (
              <Note key={index} note={note} notes={notes} setNotes={setNotes}></Note>
            ))}
            <div className="pt-4 mt-2 relative flex items-center justify-between gap-2">
              <div className="__line absolute top-0 inset-x-0 h-[1px]"></div>
              <Button size="sm" className="px-4" onClick={addNote}>
                Add Note
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-2 text-red-600" onClick={() => setNotes([])}>
                <Trash2 className="w-4 h-4" />
                Clear All Notes
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
