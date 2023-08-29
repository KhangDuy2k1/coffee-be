import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import AuthRouter from './routes/authRouter';
import Connect from './config/database';
import { ErrorUrl } from './middlewares/errorMiddleware';
import cors, { CorsOptions } from 'cors';
import http from 'http';
import { RunSocket } from '../socket/socket';
import CoffeeItemRouter from './routes/coffeeItemRouter';
import 'express-async-errors';
import { CategoryRouter } from './routes/categoryRouter';
class App {
     private app: express.Application;
     private port: number | string;
     private server: http.Server;
     // private coreOption: CorsOptions = {
     //      // origin: 'http://localhost:8888',
     // };
     SetupMiddleware = () => {
          // this.app.use(cors(this.coreOption));
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
     }
     ErrorUrl = () => {
          this.app.use(new ErrorUrl().errUrl);
     };
     constructor(port: number | string) {
          this.app = express();
          this.port = port;
          this.server = http.createServer(this.app);
          this.SetupMiddleware();
          this.Api();
          this.ErrorUrl();
     }
     public start = () => {
          this.server.listen(this.port, async (): Promise<void> => {
               await Connect();
               new RunSocket(this.server);
               console.log(
                    `⚡️[server]: Server is running at http://localhost:${this.port}`
               );
          });
     };
}
export default App;
