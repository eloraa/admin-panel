import { User2Icon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

export const Chats = ({ chats = [], className = {} }) => {
  return (
    <div className="grid gap-4 py-4">
      {chats.map((chat, index) =>
        chat.type === 'incoming' ? (
          <div className="flex items-start gap-4" key={index}>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src={chat.avatar} />
              <AvatarFallback className="bg-background text-muted-foreground">
                <User2Icon />
                <span className="sr-only">{chat.name}</span>
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              {chat.text && (
                <div className={cn('bg-accent p-3 rounded-md max-w-xs text-sm', className?.incoming)}>
                  <div>
                    {chat.text.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              )}
              {chat.attachments && !!chat.attachments.length && (
                <div
                  className="grid gap-2 max-w-60"
                  style={{
                    gridTemplateColumns:
                      chat.attachments.length > 1 ? `repeat(${chat.attachments.length < 3 ? chat.attachments.length : chat.attachments.length / 2}, minmax(0, 1fr))` : 'repeat(1, minmax(0, 1fr))',
                  }}
                >
                  {chat.attachments.map((attachment, index) => (
                    <Dialog key={index}>
                      <DialogTrigger>
                        <figure className="w-full h-32 bg-muted rounded-lg cursor-pointer">
                          <Image src={attachment.url} alt={attachment.name} width={attachment.width || 400} height={attachment.height || 400} className="w-full rounded-lg" />
                        </figure>
                      </DialogTrigger>
                      <DialogContent
                        className="p-0 border-none group overflow-hidden no-scrollbar max-h-[calc(100vh-200px)] max-w-4xl"
                        kbdClass="bg-white/20 backdrop-blur border-none text-[#ddd]"
                        closeClass="text-[#ddd] mix-blend-color-dodge opacity-0 group-hover:opacity-100"
                      >
                        <div className="max-h-svh overflow-x-hidden overflow-y-auto">
                          <Image width={400} height={400} className="w-full h-full" src={attachment.url} alt={attachment.name} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-4 ml-auto" key={index}>
            <div className="space-y-2">
              {chat.text && (
                <div className={cn('rounded-md bg-indigo-50 dark:bg-primary p-3 max-w-xs text-sm', className?.outgoing)}>
                  {chat.text.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}

              {chat.attachments && !!chat.attachments.length && (
                <div
                  className="grid gap-2 max-w-60"
                  style={{
                    gridTemplateColumns:
                      chat.attachments.length > 1 ? `repeat(${chat.attachments.length < 3 ? chat.attachments.length : Math.ceil(chat.attachments.length / 2)}, minmax(0, 1fr))` : 'repeat(1, minmax(0, 1fr))',
                  }}
                >
                  {chat.attachments.map((attachment, index) => (
                    <Dialog key={index}>
                      <DialogTrigger>
                        <figure className="w-full h-32 bg-muted rounded-lg cursor-pointer">
                          <Image src={attachment.url} alt={attachment.name} width={attachment.width || 400} height={attachment.height || 400} className="w-full rounded-lg" />
                        </figure>
                      </DialogTrigger>
                      <DialogContent
                        className="p-0 border-none group overflow-hidden no-scrollbar max-h-[calc(100vh-200px)] max-w-4xl"
                        kbdClass="bg-white/20 backdrop-blur border-none text-[#ddd]"
                        closeClass="text-[#ddd] mix-blend-color-dodge opacity-0 group-hover:opacity-100"
                      >
                        <div className="max-h-svh overflow-x-hidden overflow-y-auto">
                          <Image width={400} height={400} className="w-full h-full" src={attachment.url} alt={attachment.name} />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </div>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src={chat.avatar} />
              <AvatarFallback className="bg-background text-muted-foreground">
                <User2Icon />
                <span className="sr-only">{chat.name}</span>
              </AvatarFallback>
            </Avatar>
          </div>
        )
      )}
    </div>
  );
};
