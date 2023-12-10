'use client';

import Breadcrumbs from '@/app/components/images/breadcrumbs';
import ImageCard from '@/app/components/images/card';
import { GET_IMAGE } from '@/app/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const id = params.id;
  const { loading, error, data } = useQuery(GET_IMAGE, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const imageTitle = data?.image?.title || '(No Title)';

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Images', href: '/dashboard/images' },
          {
            label: imageTitle,
            href: `/dashboard/images/${id}`,
            active: true,
          },
        ]}
      />
      <ImageCard id={id} />
    </main>
  );
}
