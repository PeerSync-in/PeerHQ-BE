import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import app from './app.js';
import config from './src/config/index.js';

dotenv.config();

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: config.DATABASE_URI,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    }),
  }),
  log: config.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

async function testDatabaseConnection() {
  try {
    await db.raw('SELECT 1');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Database connection failed: ${error.message}`);
    } else {
      throw new Error('Database connection failed: Unknown error');
    }
  }
}

(async () => {
  try {
    await testDatabaseConnection();
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    
    app.on('error', (error) => {
      console.error("ERROR:", error);
      throw error;
    });
    
    app.listen(config.PORT, () => {
      console.log(`Server is Listening on http://localhost:${config.PORT}`);
    });
    
  } catch (error) {
    console.error("ERROR:", error);
    await db.destroy();
    throw error;
  }
})();

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await db.destroy();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await db.destroy();
  process.exit(0);
});

