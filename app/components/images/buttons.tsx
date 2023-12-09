import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../ui';

export function CreateImage() {
  return (
    <Button asChild>
      <Link href="/dashboard/images/new">
        <span className="hidden md:block">Create Image</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateImage({ id }: { id: string }) {
  return (
    <Button asChild variant="secondary">
      <Link
        href={`/dashboard/images/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteImage({ id }: { id: string }) {
  // const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  return (
    <form>
      {/* <form action={deleteInvoiceWithId}> */}
      <Button asChild variant="secondary">
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </Button>
    </form>
  );
}
