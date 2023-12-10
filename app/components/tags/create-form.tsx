'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_TAGS } from '@/app/lib/graphql/queries';
import { ADD_TAG } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { Field, FieldContainer, SelectField } from '../shared';
import { ICategory } from '@/app/lib/definitions';

const schema = z.object({
  name: z.string(),
  categoryId: z.string(),
});

export default function Form() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const categories: ICategory[] = data?.categories;

  const [addTag] = useMutation(ADD_TAG, {
    refetchQueries: [{ query: GET_TAGS }],
    onCompleted: (data) => {
      router.push('/dashboard/tags');
    },
  });

  const [form, fields] = useForm({
    id: 'create-tag-form',
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
      const { name, categoryId } = submission.value;
      addTag({
        variables: {
          name,
          categoryId,
        },
      });
    },
    defaultValue: {
      name: '',
      categoryId: '',
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
        {/* Tag name */}
        <FieldContainer>
          <Field
            labelProps={{ children: 'Tag name' }}
            inputProps={{
              autoFocus: true,
              placeholder: 'Enter tag name here',
              ...conform.input(fields.name, { ariaAttributes: true }),
            }}
            errors={fields.name.errors}
          />
        </FieldContainer>

        {/* Tag category */}
        <FieldContainer>
          <SelectField
            labelProps={{ children: 'Tag category' }}
            selectProps={{
              placeholder: 'Select tag category here',
              ...conform.select(fields.categoryId, { ariaAttributes: true }),
            }}
            items={
              categories?.map((category) => ({
                value: category.id,
                label: category.name,
              })) || []
            }
            errors={fields.categoryId.errors}
          />
        </FieldContainer>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href="/dashboard/images">Cancel</Link>
        </Button>

        <Button type="submit">Create Tag</Button>
      </div>
    </form>
  );
}
