import express from 'express';
import Connect from './src/config/database';
import AuthRouter from './src/routes/auth';
import { CategoryRouter } from './src/routes/category';
import { orderRouter } from './src/routes/order';
import { ErrorUrl } from './src/middlewares/error';
import cors, { CorsOptions } from 'cors';
import http from 'http';
import CoffeeItemRouter from './src/routes/coffeeItem';
import 'express-async-errors';
import { reviewsRouter } from './src/routes/star';
import { walletRouter } from './src/routes/wallet';
export class App {
     private app: express.Application;
     private port: number | string;
     private server: http.Server;
     private url: string | undefined;
     constructor(port: number | string) {
          this.url = process.env.URL_DB;
          this.app = express();
          this.port = port;
          this.server = http.createServer(this.app);
          this.SetupMiddleware();
          this.Api();
          this.ErrorUrl();
     }
     SetupMiddleware = () => {
          this.app.use(cors());
          this.app.use(express.json({ limit: '50mb' }));
          this.app.use(
               express.urlencoded({
                    extended: true,
                    limit: '50mb',
               })
          );
     };
     Api() {
          this.app.use('/api/user', AuthRouter);
          this.app.use('/api/coffee', CoffeeItemRouter);
          this.app.use('/api/category', CategoryRouter);
          this.app.use('/api/order', orderRouter);
          this.app.use('/api/reviews', reviewsRouter);
          this.app.use('/api/wallet', walletRouter);
     }
     ErrorUrl = () => {
          this.app.use(new ErrorUrl().errUrl);
     };
     public start = () => {
          this.server.listen(this.port, async (): Promise<void> => {
               await Connect();
               console.log(
                    `⚡️[server]: Server is running at http://localhost:${this.port}`
               );
          });
     };
}
