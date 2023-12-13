'use client';

import { ICategory } from '@/app/lib/definitions';
import { formatTimeStampsReadable } from '@/app/lib/format-date';
import { UpdateCategory } from './buttons';
import DeleteCategoryForm from './delete-form';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
} from '../ui';
import Link from 'next/link';

type CategoryCardProps = {
  category: ICategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, createdAt, updatedAt, tags } = category;

  const Tags = () => (
    <div className="flex flex-col space-y-4">
      <h6 className="text-h6 mb-2">Tags</h6>
      <div>
        {tags?.map((tag) => (
          <Link key={tag.id} href={`/dashboard/tags/${tag.id}`}>
            <Badge className="mr-2 mb-2">{tag.name}</Badge>
          </Link>
        ))}
      </div>
    </div>
  );

  const TimeStamps = () => (
    <div className="text-body-xs text-muted-foreground">
      <p>Created: {formatTimeStampsReadable(createdAt)}</p>
      <p>Updated: {formatTimeStampsReadable(updatedAt)}</p>
    </div>
  );

  const Buttons = () => (
    <div className="grid grid-cols-2 gap-6">
      <UpdateCategory id={id} />
      <DeleteCategoryForm id={id} />
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Category details</CardDescription>
      </CardHeader>
      <CardContent>
        <Tags />
        <Separator className="my-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <TimeStamps />
        <Buttons />
      </CardFooter>
    </Card>
  );
}
