import { cn } from '@/lib/utils';
import * as React from 'react';

const Title = React.forwardRef(({ className, ...props }, ref) => <h1 ref={ref} className={cn('font-medium', className)} {...props} />);
Title.displayName = 'Title';

export { Title };
