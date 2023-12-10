import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../ui';

export function CreateCollection() {
  return (
    <Button asChild>
      <Link href="/dashboard/collections/new">
        <span className="hidden md:block">Create Collection</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  );
}

export function UpdateCollection({ id }: { id: string }) {
  return (
    <Button asChild variant="secondary">
      <Link
        href={`/dashboard/collections/${id}/edit`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </Button>
  );
}

export function DeleteCollection({ id }: { id: string }) {
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
