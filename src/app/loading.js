import { Skeleton } from '@/components/ui/skeleton';

const loading = () => {
  return (
    <div className="md:px-6 px-4">
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton className="p-4 bg-muted" delay={index * 100} key={index}>
            <div className="space-y-2 mb-4">
              <Skeleton className="h-6 w-16"></Skeleton>
              <Skeleton className="h-6 w-28"></Skeleton>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 min-w-8"></Skeleton>
              <Skeleton className="h-6 w-full min-w-0"></Skeleton>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default loading;
