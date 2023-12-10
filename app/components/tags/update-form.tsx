'use client';

import { ICategory, ITag } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_TAG } from '@/app/lib/graphql/queries';
import { UPDATE_TAG } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { Field, FieldContainer, SelectField } from '../shared';

const schema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(),
});

export default function Form({ tag }: { tag: ITag }) {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const categories: ICategory[] = data?.categories;

  const [updateTag] = useMutation(UPDATE_TAG, {
    refetchQueries: [{ query: GET_TAG, variables: { id: tag.id } }],
    onCompleted: (data) => {
      router.push(`/dashboard/tags/${tag.id}`);
    },
  });

  const [form, fields] = useForm({
    id: 'update-tag-form',
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
      const { id, name, categoryId } = submission.value;
      updateTag({
        variables: {
          id,
          name,
          categoryId,
        },
      });
    },
    defaultValue: {
      id: tag.id ?? '',
      name: tag.name ?? '',
      categoryId: tag.categoryId ?? '',
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
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Tag Name */}
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
          <Link href={`/dashboard/tags/${tag.id}`}>Cancel</Link>
        </Button>

        <Button type="submit">Update Tag</Button>
      </div>
    </form>
  );
}
