import { CustomCard } from '@/components/shared/customcard';
import { Title } from '@/components/ui/title';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LightbulbIcon } from 'lucide-react';
import { CircleDotDashedIcon } from 'lucide-react';
import { CircleCheckIcon } from 'lucide-react';

export default function Kam() {
  return (
    <div className="space-y-8 layer">
      <section>
        <Title>Onboarding Dashboard</Title>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4">
          <TooltipProvider>
            <CustomCard Icon={LightbulbIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">New</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={CircleDotDashedIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Processing</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Processing</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={CircleCheckIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Complete</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Complete</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
          </TooltipProvider>
        </div>
      </section>
    </div>
  );
}
