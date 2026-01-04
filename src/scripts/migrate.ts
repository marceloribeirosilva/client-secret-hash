import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseProvider } from '../providers/DatabaseProvider.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  console.log('Starting migration...');
  
  try {
    const db = DatabaseProvider.getInstance();
    
    // Assuming we are running from dist/scripts, we look for the SQL file in src/database/migrations
    // Adjust this path if your build process copies assets to dist
    const sqlPath = path.resolve(__dirname, '../../src/database/migrations/001_create_clients_table.sql');
    
    console.log(`Reading migration file from: ${sqlPath}`);
    const sql = await fs.readFile(sqlPath, 'utf-8');

    console.log('Executing SQL...');
    await db.query(sql);
    
    console.log('Migration completed successfully: clients table created.');
    await db.close();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
