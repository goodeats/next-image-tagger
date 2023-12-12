'use client';

import { ICategory, IImage } from '@/app/lib/definitions';
import Link from 'next/link';
import { Badge, Button } from '@/app/components/ui';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CATEGORIES, GET_IMAGE } from '@/app/lib/graphql/queries';
import { UPDATE_TAGS_TO_IMAGE } from '@/app/lib/graphql/mutations';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { conform, useForm } from '@conform-to/react';
import { parse } from '@conform-to/zod';
import { useState } from 'react';

type TagHashObject = {
  [key: string]: {
    tagName: string;
    categoryName: string;
  };
};

const schema = z.object({
  imageId: z.string(),
  tagIds: z.string().array(),
});

export default function ImageTagsForm({
  image,
  tagIds,
}: {
  image: IImage;
  tagIds: string[];
}) {
  const [checkedTags, setCheckedTags] = useState(tagIds ?? []);
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const categories: ICategory[] = data?.categories;

  const [updateImage] = useMutation(UPDATE_TAGS_TO_IMAGE, {
    refetchQueries: [{ query: GET_IMAGE, variables: { id: image.id } }],
    onCompleted: (data) => {
      router.push(`/dashboard/images/${image.id}`);
    },
  });

  const [form, fields] = useForm({
    id: 'image-tags-form',
    shouldValidate: 'onInput',
    onValidate: ({ formData }) => {
      const submission = parse(formData, { schema });
      if (submission.value) {
        const { tagIds } = submission.value;
        setCheckedTags(tagIds);
      }
      return submission;
    },
    onSubmit: (event, { formData }) => {
      event.preventDefault();

      const submission = parse(formData, { schema });
      if (!submission.value) {
        console.warn('no submission', submission);
        return;
      }
      const { imageId, tagIds } = submission.value;
      console.log('submission', submission.value);

      updateImage({
        variables: {
          imageId,
          tagIds,
        },
      });
    },
    defaultValue: {
      imageId: image.id ?? '',
      tagIds: checkedTags ?? [],
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const Categories = () => {
    // https://conform.guide/checkbox-and-radio-group#checkbox
    // tagHash is a quick and dirty hack to use conform's checkbox group
    // options must be an array of strings
    // separating the tags by category
    const tagHash: TagHashObject = {};
    categories.forEach((category) => {
      category.tags.forEach((tag) => {
        tagHash[tag.id] = { tagName: tag.name, categoryName: category.name };
      });
    });

    return (
      <div className="flex items-center justify-between space-x-2">
        <fieldset>
          <legend>Categories</legend>
          {conform
            .collection(fields.tagIds, {
              type: 'checkbox',
              options: Object.keys(tagHash),
            })
            .map((props, index) => {
              const { defaultChecked } = props;
              const tagName = tagHash[props.value].tagName;
              return (
                <label key={index}>
                  <Badge
                    variant={defaultChecked ? 'default' : 'outline'}
                    className="mr-2 mb-2"
                  >
                    <input {...props} className="hidden" />
                    {tagName}
                  </Badge>
                </label>
              );
            })}
        </fieldset>
      </div>
    );
  };

  return (
    <form {...form.props}>
      {/*
					This hidden submit button is here to ensure that when the user hits
					"enter" on an input field, the primary form function is submitted
					rather than the first button in the form (which is delete/add image).
				*/}
      <button type="submit" className="hidden" />
      <input type="hidden" {...conform.input(fields.imageId)} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <Categories />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button asChild variant="secondary">
          <Link href={`/dashboard/images/${image.id}`}>Cancel</Link>
        </Button>

        <Button type="submit">Update Image Tags</Button>
      </div>
    </form>
  );
}
