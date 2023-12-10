'use client';

import { useQuery } from '@apollo/client';
import { GET_COLLECTION } from '@/app/lib/graphql/queries';
import { ICollection } from '@/app/lib/definitions';
import { DisplayCard } from '../shared/display-card';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateCollection } from './buttons';
import DeleteImageForm from './delete-form';

type CollectionCardProps = {
  id: string;
};

export default function CollectionCard({ id }: CollectionCardProps) {
  const { data, loading, error } = useQuery(GET_COLLECTION, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const collection: ICollection = data?.collection;
  if (!collection) return <p>Collection not found</p>;
  const { name, createdAt, updatedAt, images } = collection;

  const Timestamps = () => (
    <div>
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </div>
  );

  const CardContent = () => (
    <>
      <div>Images: {images.length}</div>
    </>
  );

  const CardFooter = () => (
    <div className="grid grid-cols-2 gap-6">
      <UpdateCollection id={id} />
      {/* <DeleteImageForm id={id} /> */}
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
