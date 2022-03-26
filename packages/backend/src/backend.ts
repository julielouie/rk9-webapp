import { Server } from './server';
import { Database } from './db';
import { Seeder } from './utils/seed.utils';
import { parseOrDefault } from './utils/backend.utils';

export const DEFAULT_API_PORT = 7777;

export class Backend {
  private server: Server;

  private db: Database;

  private seeder: Seeder;

  private environment: string | undefined;

  constructor(apiPort: string | number | undefined, dbUrl: string | undefined) {
    this.server = new Server(parseOrDefault(apiPort, DEFAULT_API_PORT));
    this.db = new Database(dbUrl);
    this.seeder = new Seeder();
    this.environment = process.env.ENVIRONMENT || 'development';
  }

  async start(): Promise<void> {
    console.log(`

       _____    __   __) __      __       __)
  (, /   ) (, ) /  /   )    (, )  |  /      /)
    /__ /    /(   (__,/        | /| /   _  (/_ _  __  __
 ) /   \_ ) /  \_    /         |/ |/  _(/_/_) (_(_/_)_/_)_
(_/      (_/        /          /  |            .-/ .-/
                                              (_/ (_/

    
    `);

    try {
      await this.db.connect();
    } catch (err) {
      console.log('Could not initialize DB, exiting...', err);
      return;
    }

    if (this.environment === 'development') {
      try {
        this.seeder.seed();
      } catch (err) {
        console.log('Could not run seed, exiting...', err);
        return;
      }
    }

    try {
      await this.server.start();
    } catch (err: any) {
      console.log(`Could not start webserver -- Reason: ${err.message}`);
    }
  }

  async stop(): Promise<void> {
    console.log('Stopping MSGE, exiting...');

    try {
      this.server.stop();
    } catch (err) {
      console.log('', err);
    }

    try {
      await this.db.close();
    } catch (err) {
      console.log('', err);
    }
  }
}
