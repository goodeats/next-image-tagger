'use client';

import { Breadcrumbs } from '@/app/components/shared';
import { IImage } from '@/app/lib/definitions';
import { GET_IMAGE } from '@/app/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { notFound } from 'next/navigation';
import ImageTagger from '@/app/components/images/image-tagger';

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

  const image: IImage = data?.image;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!image) notFound();

  const imageTitle = image?.title || '(No Title)';

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Images', href: '/dashboard/images' },
          { label: imageTitle, href: `/dashboard/images/${id}` },
          {
            label: 'Tags',
            href: `/dashboard/images/${id}/tags`,
            active: true,
          },
        ]}
      />
      <ImageTagger image={image} />
    </main>
  );
}
