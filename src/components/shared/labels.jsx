import { colord } from 'colord';
import { Badge } from '../ui/badge';
import { getShade } from '@/lib';
import { Button } from '../ui/button';
import { Popover, PopoverContent } from '../ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';

export const Labels = ({ labels }) => {
  return (
    <div className="flex items-center gap-1">
      <Badge
        variant="outline"
        className="gap-1 px-1.5"
        style={{ backgroundColor: colord(labels[0].color).alpha(0.12).toRgbString(), color: getShade(labels[0].color) ? colord(labels[1].color).darken(0.25).toHex() : labels[0].color }}
      >
        <span style={{ backgroundColor: labels[0].color }} className="w-2 h-2 rounded-full"></span>
        {labels[0].title}
      </Badge>
      {labels.length > 1 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-5 h-5 rounded-full min-w-0 p-0 text-[10px] font-bold border border-dotted"
              style={{
                color: getShade(labels[1].color) ? colord(labels[1].color).darken(0.25).toHex() : labels[1].color,
                backgroundColor: colord(labels[1].color).alpha(0.12).toRgbString(),
                borderColor: labels[1].color,
              }}
            >
              {labels.length - 1}+
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background backdrop-blur-none" side="top" align="end">
            <div className="grid gap-1.5 p-1">
              {labels.slice(1).map((label, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="gap-1 px-1.5"
                  style={{ backgroundColor: colord(label.color).alpha(0.12).toRgbString(), color: getShade(label.color) ? colord(label.color).darken(0.25).toHex() : label.color }}
                >
                  <span style={{ backgroundColor: label.color }} className="w-2 h-2 rounded-full"></span>
                  {label.title}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
