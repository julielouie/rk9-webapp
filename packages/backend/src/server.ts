import express from 'express';
import expressFileUpload from 'express-fileupload';
import { createServer, Server as HttpServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user';
import uploadRouter from './routes/upload';
import testimonialRouter from './routes/testimonial';
import groupRouter from './routes/group';
import blogPostRouter from './routes/blogPost';
import postRouter from './routes/post';
import journalPostRouter from './routes/journalPost';

export const app = express();
const http: HttpServer = createServer(app);

//
// ─── MIDDLEWARE SETUP ───────────────────────────────────────────────────────────
//

app.use(cors());
app.use(express.json());
app.use(expressFileUpload());
app.use(cookieParser());

//
// ─── ROUTE SETUP ────────────────────────────────────────────────────────────────
//

app.use('/api/users', userRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/testimonials', testimonialRouter);
app.use('/api/groups', groupRouter);
app.use('/api/blogPosts', blogPostRouter);
app.use('/api/posts', postRouter);
app.use('/api/journalPosts', journalPostRouter);

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
