import fs from 'fs';
import path from 'path';

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Please provide a migration name');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const fileName = `${timestamp}_${migrationName}.ts`;
const migrationsDir = path.join(__dirname, './../migrations');
const filePath = path.join(migrationsDir, fileName);

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

const template = `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // TODO: Add migration logic
}

export async function down(db: Kysely<any>): Promise<void> {
  // TODO: Revert migration logic
}
`;

fs.writeFileSync(filePath, template);
console.log(`✅ Created migration: migrations/${fileName}`);