import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import cors from 'cors';
import userRouter from './routes/user';

export const app = express();
const http: HttpServer = createServer(app);

//
// ─── MIDDLEWARE SETUP ───────────────────────────────────────────────────────────
//

// const env = process.env.ENVIRONMENT || 'development';
// const host = process.env.HOST || '0.0.0.0';
// const port = process.env.PORT || 7777;
// const mongo_uri = process.env.MONGODB_URI || 'mongodb://rk9-database:27017/rk9';

app.use(cors());
app.use(express.json());

//
// ─── ROUTE SETUP ────────────────────────────────────────────────────────────────
//

app.use('/api/users', userRouter);

//
// ─── SERVER SETUP ────────────────────────────────────────────────────────────────
//

export class Server {
  private port: number;

  private httpServer: HttpServer | null;

  constructor(port: number) {
    this.port = port;
    this.httpServer = null;
  }

  start(): Promise<void> {
    if (this.httpServer === null) {
      return new Promise((resolve) => {
        this.httpServer = http.listen(this.port, () => {
          console.log(`RK9 web server listening on ${this.port}...`);
          resolve();
        });
      });
    }
    throw new Error(`Web server already started on port ${this.port}.`);
  }

  stop(): void {
    if (this.httpServer) {
      this.httpServer = null;
    }
  }
}
