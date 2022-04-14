import mongoose, { Mongoose } from 'mongoose';

const DEFAULT_DB_URL = process.env.MONGODB_URI || '';

export class Database {
  private db: Mongoose | null;

  private dbUrl: string;

  constructor(dbUrl?: string) {
    this.db = null;
    this.dbUrl = dbUrl || DEFAULT_DB_URL;
  }

  async connect(): Promise<void> {
    try {
      console.log('Attempting to connect MongoDB...');
      this.db = await mongoose.connect(this.dbUrl);
    } catch (err) {
      throw new Error(
        'Unable to connect to mongo database, check to see if docker image is running.',
      );
    }
    console.log(`Connected to MongoDB at ${this.dbUrl}`);
  }

  async close(): Promise<void> {
    try {
      if (this.db) {
        await this.db.disconnect();
        console.log('Closed connection to MongoDB.');
      }
    } catch (err) {
      console.log('Cannot close connection to MongoDB...');
    }
  }
}

export default Database;
