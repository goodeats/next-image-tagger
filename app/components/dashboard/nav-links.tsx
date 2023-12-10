'use client';

import {
  PhotoIcon,
  HomeIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  TagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Button } from '../ui';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Images',
    href: '/dashboard/images',
    icon: PhotoIcon,
  },
  {
    name: 'Collections',
    href: '/dashboard/collections',
    icon: RectangleGroupIcon,
  },
  {
    name: 'Categories',
    href: '/dashboard/categories',
    icon: RectangleStackIcon,
  },
  {
    name: 'Tags',
    href: '/dashboard/tags',
    icon: TagIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Button
            key={link.name}
            asChild
            variant={pathname === link.href ? 'active' : 'secondary'}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
            )}
          >
            <Link href={link.href}>
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </Button>
        );
      })}
    </>
  );
}
