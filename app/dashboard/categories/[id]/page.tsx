'use client';

import Breadcrumbs from '@/app/components/categories/breadcrumbs';
import CategoryCard from '@/app/components/categories/card';
import { ICategory } from '@/app/lib/definitions';
import { GET_CATEGORY } from '@/app/lib/graphql/queries';
import { useQuery } from '@apollo/client';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const id = params.id;
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  const category: ICategory = data?.category;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!category) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: category.name,
            href: `/dashboard/categories/${id}`,
            active: true,
          },
        ]}
      />
      <CategoryCard id={id} />
    </main>
  );
}
