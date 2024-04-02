import { App } from './index';
import 'dotenv/config';
const port: number | string = process.env.PORT || 4000;
const myApp = new App(port);
myApp.start();
