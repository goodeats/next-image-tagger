'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/ui';
import { useMutation } from '@apollo/client';
import { DELETE_IMAGE } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { GET_IMAGES } from '@/app/lib/graphql/queries';

const schema = z.object({
  imageId: z.string(),
});

export default function DeleteImageForm({ id }: { id: string }) {
  const router = useRouter();

  const [deleteImage] = useMutation(DELETE_IMAGE, {
    refetchQueries: [{ query: GET_IMAGES }],
    onCompleted: (data) => {
      console.log('image deleted');
      router.push('/dashboard/images');
    },
  });

  const [form] = useForm({
    id: 'delete-image-form',
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { imageId } = submission.value;
      deleteImage({
        variables: {
          id: imageId,
        },
      });
    },
  });

  return (
    <form method="post" {...form.props}>
      <input type="hidden" name="imageId" value={id} />
      <Button
        variant="destructive"
        type="submit"
        className="rounded-md border p-2"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </Button>
    </form>
  );
}
