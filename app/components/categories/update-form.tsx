'use client';

import { ICategory } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/components/ui';
import { useMutation } from '@apollo/client';
import { GET_CATEGORY } from '@/app/lib/graphql/queries';
import { UPDATE_CATEGORY } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { Field, FieldContainer } from '../shared';

const schema = z.object({
  id: z.string(),
  name: z.string(),
});

export default function Form({ category }: { category: ICategory }) {
  const router = useRouter();

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORY, variables: { id: category.id } }],
    onCompleted: (data) => {
      router.push(`/dashboard/categories/${category.id}`);
    },
  });

  const [form, fields] = useForm({
    id: 'update-category-form',
    shouldValidate: 'onBlur',
    onValidate: ({ formData }) => {
      return parse(formData, { schema });
    },
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { id, name } = submission.value;
      updateCategory({
        variables: {
          id,
          name,
        },
      });
    },
    defaultValue: {
      id: category.id ?? '',
      name: category.name ?? '',
    },
  });

  return (
    <form {...form.props}>
      {/*
					This hidden submit button is here to ensure that when the user hits
					"enter" on an input field, the primary form function is submitted
					rather than the first button in the form (which is delete/add image).
				*/}
      <button type="submit" className="hidden" />
      <input type="hidden" {...conform.input(fields.id)} />
      <div className="rounded-md bg-secondary text-foreground-secondary p-4 md:p-6">
        {/* Category Name */}
        <FieldContainer>
          <Field
            labelProps={{ children: 'Category name' }}
            inputProps={{
              autoFocus: true,
              placeholder: 'Enter category name here',
              ...conform.input(fields.name, { ariaAttributes: true }),
            }}
            errors={fields.name.errors}
          />
        </FieldContainer>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href={`/dashboard/categories/${category.id}`}>Cancel</Link>
        </Button>

        <Button type="submit">Update Category</Button>
      </div>
    </form>
  );
}
