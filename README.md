# Assets Hub

## Configuring the Environment Variables

To configure the environment variables, update the `.env` file with the appropriate values:

```
API_URL={API_URL}
DATABASE_URL="postgresql://{USERNAME}:{PASSWORD}@{SERVER}:{PORT}/{TABLE_NAME}"
SECRET_KEY={SECRET_KEY}
```

## Installation

To install the project dependencies, run:

```sh
npm install
# or
bun install
```

## Usage

To start the development server, run:

```sh
npm run dev
# or
bun dev
```

To build the project, run:

```sh
npm run build
# or
bun run build
```

To start the production server, run:

```sh
npm start
# or
bun start
```

## Database

To generate Prisma client, run:

```sh
npm run db:gen
# or
bun db:gen
```

To push the Prisma schema to the database, run:

```sh
npm run db:push
# or
bun db:push
```

To seed the database, run:

```sh
npm run db:seed
# or
bun db:seed
```

To open Prisma Studio, run:

```sh
npm run db:std
# or
bun db:std
```
