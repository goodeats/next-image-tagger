'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/ui';
import { useMutation } from '@apollo/client';
import { DELETE_TAG } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { GET_TAGS } from '@/app/lib/graphql/queries';

const schema = z.object({
  tagId: z.string(),
});

export default function DeleteTagForm({ id }: { id: string }) {
  const router = useRouter();

  const [deleteTag] = useMutation(DELETE_TAG, {
    refetchQueries: [{ query: GET_TAGS }],
    onCompleted: (data) => {
      router.push('/dashboard/tags');
    },
  });

  const [form] = useForm({
    id: 'delete-tag-form',
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { tagId } = submission.value;
      deleteTag({
        variables: {
          id: tagId,
        },
      });
    },
  });

  return (
    <form method="post" {...form.props}>
      <input type="hidden" name="tagId" value={id} />
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
