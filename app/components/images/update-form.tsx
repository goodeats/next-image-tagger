'use client';

import { CollectionField, ICollection, IImage } from '@/app/lib/definitions';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '@/app/lib/graphql/queries';
import { UPDATE_IMAGE } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { customLoader, isValidImageUrl } from '@/app/lib/image-utils';
import { useState } from 'react';
import Image from 'next/image';
import { Field, FieldContainer } from '../shared';

const schema = z.object({
  id: z.string(),
  url: z.string().refine((url) => isValidImageUrl(url), {
    message: 'Invalid image URL',
  }),
  title: z.string().optional(),
  alt: z.string().optional(),
  collectionId: z.string().optional(),
});

export default function Form({ image }: { image: IImage }) {
  const [imageUrl, setImageUrl] = useState(image.url ?? '');
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_COLLECTIONS);
  const collections: ICollection[] = data?.collections;

  const [updateImage] = useMutation(UPDATE_IMAGE, {
    onCompleted: (data) => {
      console.log('image updated');
      router.push(`/dashboard/images/${image.id}`);
    },
  });

  const [form, fields] = useForm({
    id: 'create-image-form',
    shouldValidate: 'onBlur',
    onValidate: ({ formData }) => {
      // small fix could be to revalidate url only if _it_ was on blur
      // reset image url and loaded state
      setImageUrl('');

      // parse the form data
      // and check if the url is valid
      // if it is, set the image url to preview it
      const submission = parse(formData, { schema });
      if (submission.value && submission.value.url) {
        const { url } = submission.value;
        // set image url if it's valid
        // `return submission` will let the UI know if there are any errors
        isValidImageUrl(url) && setImageUrl(url);
      }

      return submission;
    },
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      if (!imageLoaded) {
        console.warn('image not loaded');
        alert('image not loaded');
        return;
      }

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { id, url, title, alt, collectionId } = submission.value;
      updateImage({
        variables: {
          id,
          url,
          title,
          alt,
          collectionId,
        },
      });
    },
    defaultValue: {
      id: image.id ?? '',
      url: image.url ?? '',
      title: image.title ?? '',
      alt: image.alt ?? '',
      collectionId: image.collectionId ?? '',
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const LoadedImage = () => (
    <div className="flex items-center justify-center">
      <Image
        loader={customLoader}
        src={imageUrl}
        width={160}
        height={160}
        className="rounded-full"
        alt="image url preview"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
      />
    </div>
  );

  const ImagePreview = () => (
    <div className="flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <LoadedImage />
        ) : (
          <p className="text-gray-400 text-sm">No image</p>
        )}
      </div>
    </div>
  );

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
        <ImagePreview />

        {/* Image Url */}
        <FieldContainer>
          <Field
            labelProps={{ children: 'Image url' }}
            inputProps={{
              autoFocus: true,
              placeholder: 'Enter image url here',
              ...conform.input(fields.url, { ariaAttributes: true }),
            }}
            errors={fields.url.errors}
          />
        </FieldContainer>

        {/* Image Title */}
        <FieldContainer>
          <Field
            labelProps={{ children: 'Image title' }}
            inputProps={{
              placeholder: 'Enter title for your image here',
              ...conform.input(fields.title, { ariaAttributes: true }),
            }}
            errors={fields.title.errors}
          />
        </FieldContainer>

        {/* Image Alt */}
        <FieldContainer>
          <Field
            labelProps={{ children: 'Image Alt' }}
            inputProps={{
              placeholder:
                'Enter the information for your image if the user for some reason cannot view it here',
              ...conform.input(fields.alt, { ariaAttributes: true }),
            }}
            errors={fields.alt.errors}
          />
        </FieldContainer>

        {/* Collection Name */}
        <FieldContainer>
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
        </FieldContainer>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href={`/dashboard/images/${image.id}`}>Cancel</Link>
        </Button>

        <Button type="submit" disabled={!imageLoaded}>
          Update Image
        </Button>
      </div>
    </form>
  );
}
