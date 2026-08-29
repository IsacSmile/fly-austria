import { defineConfig } from 'drizzle-kit';

const dbUrl = process.env.DATABASE_URL || 'file:local.db';
const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://');

export default defineConfig(
  isPostgres
    ? {
        schema: './src/db/schema.ts',
        out: './drizzle/postgres',
        dialect: 'postgresql',
        dbCredentials: {
          url: dbUrl,
        },
      }
    : {
        schema: './src/db/schema.ts',
        out: './drizzle/sqlite',
        dialect: 'sqlite',
        dbCredentials: {
          url: dbUrl,
          ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
        } as any,
      }
);
