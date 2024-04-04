import { Title } from '@/components/ui/title';
import { AddUser } from './add-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconWrapper } from '@/components/ui/icon';
import { EqualIcon } from 'lucide-react';
import { TramFrontIcon } from 'lucide-react';
import { BriefcaseBusinessIcon } from 'lucide-react';
import { MessageSquareHeartIcon } from 'lucide-react';
import { SmilePlusIcon } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="space-y-8 layer">
      <section>
        <Title>Overview</Title>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4">
          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <SmilePlusIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Total KAM</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Active</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Inactive</p>
                <h1 className="font-semibold">250000</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <TramFrontIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Total Onboarding</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Active</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Inactive</p>
                <h1 className="font-semibold">250000</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <BriefcaseBusinessIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Total Business Development Officer</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Active</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Inactive</p>
                <h1 className="font-semibold">250000</h1>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <IconWrapper size="lg" variant="ghost">
                <MessageSquareHeartIcon />
              </IconWrapper>
              <CardTitle className="text-sm">Total Client Support</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2 justify-between text-sm">
              <div>
                <p className="text-neutral-500">Active</p>
                <h1 className="font-semibold">250000</h1>
              </div>
              <div>
                <p className="text-neutral-500">Inactive</p>
                <h1 className="font-semibold">250000</h1>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      {children}
    </div>
  );
}
