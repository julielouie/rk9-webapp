import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import cors from 'cors';
import userRouter from './routes/user';
import uploadRouter from './routes/upload';

export const app = express();
const http: HttpServer = createServer(app);

//
// ─── MIDDLEWARE SETUP ───────────────────────────────────────────────────────────
//

app.use(cors());
app.use(express.json());

//
// ─── ROUTE SETUP ────────────────────────────────────────────────────────────────
//

app.use('/api/users', userRouter);
app.use('/api/uploads', uploadRouter);

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
