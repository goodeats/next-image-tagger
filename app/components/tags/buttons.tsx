'use client';

import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../ui';

export function CreateTag() {
  return (
    <Button asChild>
      <Link href="/dashboard/tags/new">
        <span className="hidden md:block">Create Tag</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateTag({ id }: { id: string }) {
  return (
    <Button asChild variant="secondary">
      <Link
        href={`/dashboard/tags/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}
