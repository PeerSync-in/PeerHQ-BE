import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Database as DatabaseType } from '../database/schemas';

export function createPostgresDB(): Kysely<DatabaseType> {
    const dialect = new PostgresDialect({
        pool: new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
            ssl: { rejectUnauthorized: false }, 
        }),
    });

    return new Kysely<DatabaseType>({
        dialect,
        log: ['error'],
    });
}
