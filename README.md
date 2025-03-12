# ImageAI Project

## Prerequisites

- Node.js (>= 18)
- npm (>= 10.9.2)
- PostgreSQL

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/imageAI.git
cd imageAI
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

PORT=8080
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name init

npx prisma generate
```

### 4. Start the Whole Turbo Repo

```bash
npm run dev
```
or
### 5. Start the Backend Service

```bash
cd apps/backend

npm start
```

### 6. Start the Frontend Application

```bash
cd apps/web

npm run dev
```



Open your browser and navigate to `http://localhost:3000` to see the frontend. The backend will be running on `http://localhost:8080`.




## Project Structure

- `apps/backend`: The backend service using Express and Prisma.
- `apps/web`: The frontend application using Next.js.
- `packages/common`: Shared types and utilities.
- `packages/db`: Prisma database client and schema.
- `packages/ui`: Shared UI components.

## Scripts

- `npm run build`: Build the project.
- `npm run dev`: Start the development servers.
- `npm run lint`: Run ESLint.
- `npm run format`: Format the code using Prettier.
- `npm run check-types`: Check TypeScript types.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Express Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Zod Documentation](https://zod.dev/)
