import Form from '@/app/components/collections/create-form';
import Breadcrumbs from '@/app/components/collections/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Collections', href: '/dashboard/collections' },
          {
            label: 'Create Collection',
            href: '/dashboard/collections/new',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
