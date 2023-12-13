import Form from '@/app/components/categories/create-form';
import { Breadcrumbs } from '@/app/components/shared';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Create Category',
            href: '/dashboard/categories/new',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
