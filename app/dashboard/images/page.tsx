import { lusitana } from '@/app/components/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Images',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Images</h1>
      </div>
    </div>
  );
}
