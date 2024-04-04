'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SmileIcon } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

export const EmojiPicker = ({ onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-5 w-5 text-muted-foreground hover:text-foreground transition" />
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-transparent font-emoji *:!font-emoji">
        <Picker emojiSize={18} theme="light" data={data} maxFrequentRows={1} previewPosition="none" dynamicWidth skinTonePosition="search" onEmojiSelect={emoji => onChange(emoji.native)} />
      </PopoverContent>
    </Popover>
  );
};
