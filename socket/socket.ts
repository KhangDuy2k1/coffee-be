// import express from 'express';
// import { Server as ServerSocket, Socket } from 'socket.io';
// import http from 'http';
// export class RunSocket {
//      private server: http.Server;
//      private io: ServerSocket;
//      constructor(server: http.Server) {
//           this.server = server;
//           this.io = new ServerSocket(this.server);
//           this.setup();
//      }
//      setup = () => {
//           this.io.on('connection', (socket) => {
//                const id = socket.id;
//                socket.on('order-success', (order: string) => {
//                     console.log('đặt hàng thành công', order);
//                     this.io
//                          .to(id)
//                          .emit(
//                               'order-success-notifycation',
//                               `đơn hàng ${order} được đặt thành công`
//                          );
//                });
//           });
//      };
// }
