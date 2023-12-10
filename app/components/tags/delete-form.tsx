'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/ui';
import { useMutation } from '@apollo/client';
import { DELETE_COLLECTION } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { GET_COLLECTIONS } from '@/app/lib/graphql/queries';

const schema = z.object({
  collecitonId: z.string(),
});

export default function DeleteCollectionForm({ id }: { id: string }) {
  const router = useRouter();

  const [deleteImage] = useMutation(DELETE_COLLECTION, {
    refetchQueries: [{ query: GET_COLLECTIONS }],
    onCompleted: (data) => {
      router.push('/dashboard/collections');
    },
  });

  const [form] = useForm({
    id: 'delete-collection-form',
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { collecitonId } = submission.value;
      deleteImage({
        variables: {
          id: collecitonId,
        },
      });
    },
  });

  return (
    <form method="post" {...form.props}>
      <input type="hidden" name="collecitonId" value={id} />
      <Button
        variant="secondary"
        type="submit"
        className="rounded-md border p-2"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </Button>
    </form>
  );
}
