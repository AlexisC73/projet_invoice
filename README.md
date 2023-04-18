# Projet invoice

[Live Demo](https://invoice.alexis-comte.com)

Steps to run the backend:

1. Run `pnpm install`
2. Go in the `apps/express` folder and create a `.env` file following the `.env.example` file
3. Go in the `libs/domain` folder and create a `.env` file following the `.env.example` file
4. Run `pnpm prisma:generate` that will generate the prisma client
5. Come back to the root folder and run `pnpm -r build:libs`
6. Run `pnpm build:server` that will build the express app
7. Run `pnpm start:server`

When previous steps are done, you can run the backend with the `npm run start:server` command from the root folder.
