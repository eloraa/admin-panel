'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const NotFound = () => {
  const router = useRouter();
  return (
    <main className="pt-28 md:px-10 px-5 flex flex-col items-center text-center">
      <figure className='max-w-44'>
        <Image src="/404v2.png" alt="404" width={160} height={160}></Image>
      </figure>
      <div className="flex items-center py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-primary">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">We can&apos;t find that page</h1>
          <p className="mt-4 text-neutral-400">Sorry, the page you are looking for doesn&apos;t exist or has been moved.</p>

          <div className="flex items-center justify-center mt-6 gap-x-3">
            <Button onClick={() => router.back()} variant="outline" className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>Go back</span>
            </Button>

            <a href="/">
              <Button>Take me to Dashboard</Button>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
