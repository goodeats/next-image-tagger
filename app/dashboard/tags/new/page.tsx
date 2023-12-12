import { Breadcrumbs } from '@/app/components/shared';
import Form from '@/app/components/tags/create-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tags', href: '/dashboard/tags' },
          {
            label: 'Create Tag',
            href: '/dashboard/tags/new',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
