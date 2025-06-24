import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { Migrator, FileMigrationProvider } from 'kysely'
import { promises as fs } from 'fs'
import path from 'path'

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    }),
  }),
})

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, '../database/migrations'),
  }),
})

async function main() {
  const { error, results } = await migrator.migrateToLatest()
  if (error) {
    console.error('Migration error', error)
    process.exit(1)
  }
  console.log('Migrations applied:', results?.map(r => r.migrationName))
  await db.destroy()
}

main()