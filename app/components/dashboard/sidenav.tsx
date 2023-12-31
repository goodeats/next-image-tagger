'use client';

import Link from 'next/link';
import NavLinks from '@/app/components/dashboard/nav-links';
import { ModeToggle } from '../dark-mode-toggle';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-muted p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-muted-foreground md:w-40">
          <p>Next Image Tagger</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-secondary md:block"></div>
        <ModeToggle />
      </div>
    </div>
  );
}
