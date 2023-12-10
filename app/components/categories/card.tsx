'use client';

import { useQuery } from '@apollo/client';
import { GET_CATEGORY, GET_TAG } from '@/app/lib/graphql/queries';
import { ICategory, ITag } from '@/app/lib/definitions';
import { DisplayCard } from '../shared/display-card';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateCategory, UpdateTag } from './buttons';
import DeleteTagForm from './delete-form';

type CategoryCardProps = {
  id: string;
};

export default function CategoryCard({ id }: CategoryCardProps) {
  const { data, loading, error } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const category: ICategory = data?.category;
  if (!category) return <p>Category not found</p>;
  const { name, createdAt, updatedAt, tags } = category;

  const Timestamps = () => (
    <div>
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </div>
  );

  const CardContent = () => (
    <>
      <div>Tags: {tags.length}</div>
    </>
  );

  const CardFooter = () => (
    <div className="grid grid-cols-2 gap-6">
      <UpdateCategory id={id} />
      {/* <DeleteTagForm id={id} /> */}
    </div>
  );

  return (
    <DisplayCard
      cardHeaderProps={{
        title: name || '(no name)',
        description: <Timestamps />,
      }}
      cardContentProps={{
        children: <CardContent />,
      }}
      cardFooterProps={{
        children: <CardFooter />,
      }}
    />
  );
}
