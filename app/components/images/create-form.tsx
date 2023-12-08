'use client';

import { CollectionField, ICollection } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/components/button';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '@/app/lib/graphql/queries';
import { FormEvent, useState } from 'react';
import { ADD_IMAGE } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';

const schema = z.object({
  url: z.string(),
  title: z.string().optional(),
  alt: z.string().optional(),
  collectionId: z.string().optional(),
});

export default function Form() {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_COLLECTIONS);
  const collections: ICollection[] = data?.collections;
  console.log(collections);

  const [addImage] = useMutation(ADD_IMAGE, {
    variables: {
      url: 'buggger',
      title: '',
      alt: '',
      collectionId: '',
    },
    onCompleted: (data) => {
      console.log('image added');
      router.push('/dashboard/images');
    },
  });

  const [form, fields] = useForm({
    id: 'create-image-form',
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
      const { url, title, alt, collectionId } = submission.value;
      addImage({
        variables: {
          url,
          title,
          alt,
          collectionId,
        },
      });
    },
    defaultValue: {
      url: '',
      title: '',
      alt: '',
      collectionId: '',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form {...form.props}>
      {/*
					This hidden submit button is here to ensure that when the user hits
					"enter" on an input field, the primary form function is submitted
					rather than the first button in the form (which is delete/add image).
				*/}
      <button type="submit" className="hidden" />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Image Url */}
        <div className="mb-4">
          <label htmlFor="url" className="mb-2 block text-sm font-medium">
            Choose a url
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="url"
                placeholder="Enter url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
                {...conform.input(fields.url)}
              />
            </div>
          </div>
          <div id="url-error" aria-live="polite" aria-atomic="true">
            {fields.url.errors &&
              fields.url.errors.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Image Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Choose a title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                placeholder="Enter title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                {...conform.input(fields.title)}
              />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {fields.title.errors &&
              fields.title.errors.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Image Title */}
        <div className="mb-4">
          <label htmlFor="alt" className="mb-2 block text-sm font-medium">
            Choose a alt
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="alt"
                placeholder="Enter alt"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="alt-error"
                {...conform.input(fields.alt)}
              />
            </div>
          </div>
          <div id="alt-error" aria-live="polite" aria-atomic="true">
            {fields.alt.errors &&
              fields.alt.errors.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Collection Name */}
        <div className="mb-4">
          <label
            htmlFor="collection"
            className="mb-2 block text-sm font-medium"
          >
            Choose collection
          </label>
          <div className="relative">
            <select
              id="collection"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="collection-error"
              disabled={collections?.length === 0}
              {...conform.input(fields.collectionId)}
            >
              <option value="" disabled>
                {collections?.length
                  ? 'Select a collection'
                  : 'There are no collections'}
              </option>
              {collections?.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="collectionId-error" aria-live="polite" aria-atomic="true">
            {fields.collectionId.errors &&
              fields.collectionId.errors.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/images"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Image</Button>
      </div>
    </form>
  );
}
