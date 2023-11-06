import App from './src';
const port: number | string = process.env.PORT || 4000;
console.log(port);
const myApp = new App(port);
myApp.start();
