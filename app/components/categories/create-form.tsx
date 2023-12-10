'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CATEGORY } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { Field, FieldContainer, SelectField } from '../shared';
import { ICategory } from '@/app/lib/definitions';
import { GET_CATEGORIES } from '@/app/lib/graphql/queries';

const schema = z.object({
  name: z.string(),
});

export default function Form() {
  const router = useRouter();

  const [addCategory] = useMutation(ADD_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    onCompleted: (data) => {
      router.push('/dashboard/categories');
    },
  });

  const [form, fields] = useForm({
    id: 'create-category-form',
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
      const { name } = submission.value;
      addCategory({
        variables: {
          name,
        },
      });
    },
    defaultValue: {
      name: '',
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
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category name */}
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
          <Link href="/dashboard/images">Cancel</Link>
        </Button>

        <Button type="submit">Create Category</Button>
      </div>
    </form>
  );
}
