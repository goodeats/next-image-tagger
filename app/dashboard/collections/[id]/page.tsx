'use client';

import { Breadcrumbs } from '@/app/components/shared';
import CollectionCard from '@/app/components/collections/card';
import { ICollection } from '@/app/lib/definitions';
import { GET_COLLECTION } from '@/app/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const id = params.id;
  const { loading, error, data } = useQuery(GET_COLLECTION, {
    variables: { id },
  });

  const collection: ICollection = data?.collection;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!collection) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Collections', href: '/dashboard/collections' },
          {
            label: collection.name,
            href: `/dashboard/collections/${id}`,
            active: true,
          },
        ]}
      />
      <CollectionCard collection={collection} />
    </main>
  );
}
