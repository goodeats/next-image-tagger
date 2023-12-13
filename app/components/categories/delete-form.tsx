'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/ui';
import { useMutation } from '@apollo/client';
import { DELETE_CATEGORY } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { GET_CATEGORIES } from '@/app/lib/graphql/queries';

const schema = z.object({
  categoryId: z.string(),
});

export default function DeleteCategoryForm({ id }: { id: string }) {
  const router = useRouter();

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    onCompleted: (data) => {
      router.push('/dashboard/categories');
    },
  });

  const [form] = useForm({
    id: 'delete-category-form',
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { categoryId } = submission.value;
      deleteCategory({
        variables: {
          id: categoryId,
        },
      });
    },
  });

  return (
    <form method="post" {...form.props}>
      <input type="hidden" name="categoryId" value={id} />
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
