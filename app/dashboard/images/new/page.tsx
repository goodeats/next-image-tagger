import Form from '@/app/components/images/create-form';
import { Breadcrumbs } from '@/app/components/shared';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Images', href: '/dashboard/images' },
          {
            label: 'Create Image',
            href: '/dashboard/images/new',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
