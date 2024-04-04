import { CustomCard } from '@/components/shared/customcard';
import { FilterItem } from '@/components/shared/filterItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconWrapper } from '@/components/ui/icon';
import { Title } from '@/components/ui/title';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TruckIcon } from 'lucide-react';
import { TicketPercent } from 'lucide-react';
import { WalletCardsIcon } from 'lucide-react';
import { LightbulbIcon } from 'lucide-react';
import { Building2Icon } from 'lucide-react';
import { BlocksIcon } from 'lucide-react';
import { CircleDashedIcon } from 'lucide-react';
import { AlarmClockOffIcon } from 'lucide-react';
import { ShieldOffIcon } from 'lucide-react';
import { BellIcon } from 'lucide-react';
import { MailsIcon } from 'lucide-react';
import { RefreshCcwIcon } from 'lucide-react';
import { UserRoundCogIcon } from 'lucide-react';
import { UserRoundPlusIcon } from 'lucide-react';
import { RocketIcon } from 'lucide-react';
import { Undo2Icon } from 'lucide-react';
import { CircleDotDashedIcon } from 'lucide-react';
import { LockIcon } from 'lucide-react';
import { StopCircleIcon } from 'lucide-react';
import { ShipIcon } from 'lucide-react';
import { CircleCheckIcon } from 'lucide-react';
import { TimerOffIcon } from 'lucide-react';
import { ShieldCheckIcon } from 'lucide-react';
import { PercentIcon, BriefcaseBusinessIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8 layer">
      <section>
        <Title>Overview</Title>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
          <TooltipProvider>
            <CustomCard Icon={BriefcaseBusinessIcon} withFilter>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Total Clients</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total Clients</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={PercentIcon} withFilter>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Subscription Sell Amount</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Subscription Sell Amount</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
          </TooltipProvider>
        </div>
      </section>
      <section>
        <Title>Client Status</Title>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
          <TooltipProvider>
            <CustomCard Icon={ShieldCheckIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Active</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Active</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={ShieldOffIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Inactive</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inactive</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={TimerOffIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Expired</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Expired</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
            <CustomCard Icon={LockIcon}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <p className="text-muted-foreground truncate font-medium">Locked</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Locked</p>
                </TooltipContent>
              </Tooltip>
              <h1>250000</h1>
            </CustomCard>
          </TooltipProvider>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 justify-between">
          <Title>Order & Sales Report</Title>
          <FilterItem />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <StopCircleIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Pending</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Order</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Sales Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <CircleCheckIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Confirmed</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Order</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Sales Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <ShipIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Shipped</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Order</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Sales Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <CircleDotDashedIcon />
              </IconWrapper>
              <CardTitle className="text-sm">In Transit</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Order</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Sales Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <TruckIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Delivered</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Order</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Sales Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost" className="text-destructive">
                <Undo2Icon />
              </IconWrapper>
              <CardTitle className="text-sm">Returned</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Order</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Sales Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <Title>User based on Package</Title>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mt-4">
          <CustomCard Icon={TicketPercent}>
            <div>
              <p className="text-neutral-500">Free</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
          <CustomCard Icon={RocketIcon}>
            <div>
              <p className="text-neutral-500">Startup</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
          <CustomCard Icon={WalletCardsIcon}>
            <div>
              <p className="text-neutral-500">Business</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
          <CustomCard Icon={UserRoundPlusIcon}>
            <div>
              <p className="text-neutral-500">Business Plus</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
          <CustomCard Icon={LightbulbIcon}>
            <div>
              <p className="text-neutral-500">Entrepreneur</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
          <CustomCard Icon={UserRoundCogIcon}>
            <div>
              <p className="text-neutral-500">Enterprise</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
          <CustomCard Icon={Building2Icon}>
            <div>
              <p className="text-neutral-500">Enterprise Plus</p>
              <h1 className="font-semibold">250000</h1>
            </div>
          </CustomCard>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 justify-between">
          <Title>Collection</Title>
          <FilterItem />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4">
          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <RefreshCcwIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Subscription Renew</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Quantity</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <BlocksIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Addons Sell</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Quantity</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <MailsIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Bulk SMS Deposit</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <CircleDashedIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Others</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <Title>Unpaid</Title>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-4">
          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <BellIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Unpaid Invoice</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Quantity</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <AlarmClockOffIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Overdue</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Quantity</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Amount</p>
                <h1 className="font-semibold">10,0000 TK</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
