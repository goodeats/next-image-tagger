# [Next Image Tagger](https://github.com/goodeats/next-image-tagger)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Supabase (optional)

To set up the database if using [Supabase](https://supabase.com/) (otherwise use your own method):

- Create a new project in Supabase (free for hobby accounts, excuse to try it out)
- Remember your password
- Go to `Project Settings` -> `Database` -> `Connection string`
- Select `URI` and copy
- Copy `.env.example` file to `.env` and place URI string as `DATABASE_URL`
- Replace `[YOUR-PASSWORD]` with the password you remembered

### To set up prisma when db connection is made:

```bash
npm run setup
```

This will generate the prisma client code and seed the database

In Supabase check the project `Table Editor` to see your tables

### To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) to see the Apollo server sandbox for testing GraphQL queries and mutations
