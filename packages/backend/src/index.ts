import dotenv from 'dotenv';
import { Backend } from './backend';

//
// ─── SET UP BACKEND ────────────────────────────────────────────────────────
//

dotenv.config();

const apiPort = 7777;
const dbUrl = process.env.MONGODB_URI;

const backend = new Backend(apiPort, dbUrl);

//
// ─── STARTUP ────────────────────────────────────────────────────────────────────
//

backend.start();

//
// ─── EXIT CLEAN UP ──────────────────────────────────────────────────────────────
//

process.on('SIGINT', async (): Promise<void> => {
  console.log('Received SIGINT from system.');
  try {
    await backend.stop();
  } catch (err: any) {
    console.log(`${err.message}`);
  }
  console.log('Have a nice day!');
  process.exit();
});

process.on('SIGTERM', async (): Promise<void> => {
  console.log('Received SIGTERM from system.');
  try {
    await backend.stop();
  } catch (err: any) {
    console.log(`${err.message}`);
  }
  console.log('restart...');
  process.exit();
});
