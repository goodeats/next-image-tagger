'use client';

import Image from 'next/image';
import { DeleteImage, UpdateImage } from '@/app/components/images/buttons';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '@/app/lib/graphql/queries';
import { IImage } from '@/app/lib/definitions';
import { customLoader } from '@/app/lib/image-utils';

export default function ImagesTable() {
  const { data, loading, error } = useQuery(GET_IMAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const images: IImage[] = data?.images;

  const TableImage = ({ image }: { image: IImage }) => (
    <Image
      loader={customLoader}
      src={image.url}
      className="rounded-full"
      width={28}
      height={28}
      alt={image.alt || 'image'}
    />
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {images?.map((image) => (
              <div
                key={image.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <TableImage image={image} />
                      <p>{image.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Image
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Collection
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date Added
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tags
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {images?.map((image) => (
                <tr
                  key={image.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <TableImage image={image} />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{image.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {image.collectionId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {image.createdAt.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{'tags'}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateImage id={image.id} />
                      <DeleteImage id={image.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p>Total Images: {images.length}</p>
    </div>
  );
}
