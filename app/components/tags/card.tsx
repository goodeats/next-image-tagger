'use client';

import { useQuery } from '@apollo/client';
import { GET_TAG } from '@/app/lib/graphql/queries';
import { ITag } from '@/app/lib/definitions';
import { DisplayCard } from '../shared/display-card';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateTag } from './buttons';
// import { UpdateCollection } from './buttons';
// import DeleteCollectionForm from './delete-form';

type TagCardProps = {
  id: string;
};

export default function TagCard({ id }: TagCardProps) {
  const { data, loading, error } = useQuery(GET_TAG, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const tag: ITag = data?.tag;
  if (!tag) return <p>Tag not found</p>;
  const { name, createdAt, updatedAt, images, category } = tag;

  const Timestamps = () => (
    <div>
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </div>
  );

  const CardContent = () => (
    <>
      <div>Category: {category?.name || 'n/a'}</div>
      <div>Images: {images.length}</div>
    </>
  );

  const CardFooter = () => (
    <div className="grid grid-cols-2 gap-6">
      <UpdateTag id={id} />
      {/* <DeleteCollectionForm id={id} /> */}
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
