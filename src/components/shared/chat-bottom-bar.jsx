import { FileImage, Mic, PlusCircle, SendHorizontal, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import { EmojiPicker } from './emoji-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import FileUploader from './file-uploader/FileUploader';
import { ImageIcon } from 'lucide-react';
import { FileIcon } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ApplyPrototypes } from '@/lib';
import { InfoIcon } from 'lucide-react';

export default function ChatBottombar({ sendMessage, isMobile, data, className }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = event => {
    setMessage(event.target.value);
  };
  const fileTypes = ['JPEG', 'PNG', 'GIF', 'PDF', 'JPG', 'WEBP', 'AVIF'];
  const [file, setFile] = useState(null);
  if (data.status.toLowerCase() === 'solved' || data.status.toLowerCase() === 'closed') {
    return (
      <div className="text-center w-full text-sm pt-4 font-medium flex items-center justify-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button variant="ghost" size="icon">
              <InfoIcon className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-foreground text-center">This ticket has been solved/closed.</p>
          </PopoverContent>
        </Popover>
        Can&apos;t Reply
      </div>
    );
  }
  const handleChange = file => {
    setFile(file);
  };
  const removeFile = index => {
    const newFiles = [...file];
    newFiles.splice(index, 1);
    setFile(newFiles);
  };

  const handleThumbsUp = () => {
    const newMessage = {
      id: message.length + 1,
      name: 'Alice',
      avatar: 'https://example.com/alice.png',
      text: '👍',
    };
    sendMessage(prev => [...prev, newMessage]);
    setMessage('');
  };
  const handleSend = () => {
    const newAttachments = [];
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const objectUrl = URL.createObjectURL(file[i]);
        newAttachments.push({ url: objectUrl, type: file[i].type });
      }
    }
    if (message.trim() || file) {
      const newMessage = {
        id: message.length + 1,
        name: 'Alice',
        avatar: 'https://example.com/alice.png',
        text: message.trim() !== '' ? message.advanceTrim() : null,
        attachments: newAttachments.length ? newAttachments : null,
      };
      sendMessage(prev => [...prev, newMessage]);
      setMessage('');
      setFile(null);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      setMessage(prev => prev + '\n');
    }
  };

  return (
    <div className={cn('w-full', className)}>
      <TooltipProvider>
        <div className="flex items-center gap-2 overflow-hidden overflow-x-auto pb-2">
          {file &&
            !!file.length &&
            Array.from(file).map((file, index) => (
              <div key={index} className="rounded border p-2 text-sm flex items-center justify-center relative group">
                <Tooltip>
                  <div className="flex items-center">
                    <div className="text-muted-foreground">
                      {file.type.includes('image') && <ImageIcon className="w-5 h-5" />}
                      {file.type.includes('pdf') && <FileIcon className="w-5 h-5" />}
                    </div>
                  </div>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => removeFile(index)}
                      size="icon"
                      variant="ghost"
                      className="text-red-600 hover:text-red-600 absolute bg-muted transition-opacity opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{file.name}</TooltipContent>
                </Tooltip>
              </div>
            ))}
        </div>
      </TooltipProvider>
      <div className="flex justify-between w-full items-center gap-2">
        <div className="flex">
          <Popover>
            <PopoverTrigger asChild>
              <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white')}>
                <PlusCircle size={20} className="text-muted-foreground" />
              </Link>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-full p-2">
              {message.trim() || isMobile ? (
                <div className="flex gap-2">
                  <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white')}>
                    <Mic size={20} className="text-muted-foreground" />
                  </Link>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white')}>
                        <FileImage size={20} className="text-muted-foreground" />
                      </Link>
                    </PopoverTrigger>
                    <PopoverContent side="top" align="center">
                      <FileUploader currFiles={file} setFile={setFile} className="text-black dark:text-white" multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : (
                <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white')}>
                  <Mic size={20} className="text-muted-foreground" />
                </Link>
              )}
            </PopoverContent>
          </Popover>
          {!message.trim() && !isMobile && (
            <div className="flex">
              <Popover>
                <PopoverTrigger asChild>
                  <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white')}>
                    <FileImage size={20} className="text-muted-foreground" />
                  </Link>
                </PopoverTrigger>
                <PopoverContent side="top" align="center">
                  <FileUploader currFiles={file} setFile={setFile} className="text-black dark:text-white" multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        <div key="input" className="w-full relative">
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border rounded-full flex items-center h-9 min-h-0 resize-none overflow-hidden bg-background"
          ></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
            <EmojiPicker
              onChange={value => {
                setMessage(message + value);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            />
          </div>
        </div>

        {message.trim() || file ? (
          <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white shrink-0')} onClick={handleSend}>
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link href="#" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-9 w-9', 'text-foreground dark:hover:bg-muted dark:hover:text-white shrink-0')} onClick={handleThumbsUp}>
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </div>
    </div>
  );
}
