'use client';

import Breadcrumbs from '@/app/components/collections/breadcrumbs';
import TagCard from '@/app/components/tags/card';
import { ITag } from '@/app/lib/definitions';
import { GET_TAG } from '@/app/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const id = params.id;
  const { loading, error, data } = useQuery(GET_TAG, {
    variables: { id },
  });

  const tag: ITag = data?.tag;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!tag) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tags', href: '/dashboard/tags' },
          {
            label: tag.name,
            href: `/dashboard/tags/${id}`,
            active: true,
          },
        ]}
      />
      <TagCard id={id} />
    </main>
  );
}
