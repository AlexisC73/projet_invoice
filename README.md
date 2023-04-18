# Projet invoice

[Live Demo](https://invoice.alexis-comte.com)

Steps to run the backend:

1. Run `pnpm install`
2. Create a `.env` file in the root folder of your project and fill it in by copying the contents of `/apps/express/.env.example` and `/libs/domain/.env.example` files, pasting them into the `.env` file, and saving it.
3. Run `pnpm prisma:generate` that will generate the prisma client
4. Run `pnpm -r build:libs`
5. Run `pnpm build:server` that will build the express app
6. Run `pnpm start:server`
