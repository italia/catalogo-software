# Catalogo Software

A web application for browsing the Italian public software catalogue, built with React, Vite, and Bootstrap Italia.

**Live preview:** https://catalogo-software.vercel.app/

## Prerequisites

- [Bun](https://bun.sh/) v1.3.14+ (or any other package manager: npm, yarn, pnpm)

## Getting Started

1. Create a `.env` file from the sample:

   ```sh
   cp .env.sample .env
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Start the development server:

   ```sh
   bun run dev
   ```

   The app will be available at `http://localhost:3000`.

## Environment Variables

| Variable                 | Description                                    | Default                                   |
| ------------------------ | ---------------------------------------------- | ----------------------------------------- |
| `VITE_ELASTICSEARCH_URL` | OpenSearch endpoint for the software catalogue | `https://opensearch.developers.italia.it` |
| `VITE_USE_MOCK`          | Use mocked data instead of live API calls      | `true`                                    |

To use live API calls instead of mocked data, set `VITE_USE_MOCK=false` in your `.env` file. Note that CORS from `localhost` may need to be enabled on the API side.
