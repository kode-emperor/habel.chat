import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { ChatMessage } from 'src/types/chat.message';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { time } from 'console';

//const port = 3000;
@WebSocketGateway({
  cors: {
    origin: ["http://localhost"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  transports: ['websocket'],
  namespace: 'chat'
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit{

  @WebSocketServer()
  server: Server;

  clients: {id: string | string[], connected: boolean, socket: Socket}[] = [];

  afterInit(server: any) {
    console.log("server is ready and listening to connections");
  }

  handleConnection(client: Socket, ...args: any[]) {
    //console.log(args);
    if(!this.clients.some(c => c.socket == client)) {
      this.clients.push({id: client.handshake.query.jwt, connected: true, socket: client});
      //console.log(`New connection from ${client.id}`)
    }
    return ({message: "connected to server"})
  }

  handleDisconnect(client: Socket) {
    const connectionIndex = this.clients.findIndex( conn => client == conn.socket);
    if(!(connectionIndex === -1)) {
      this.clients[connectionIndex].connected = false;
      //console.log(`Disconnected from client: ${this.clients[connectionIndex].socket.id}`);

    }

  }

  @SubscribeMessage('chat:message')
  handleMessage(@MessageBody() data: ChatMessage ) {
    console.log(data);
    this.server.emit("chat:message", data)
  }

  @SubscribeMessage('message')
  onMessage(@MessageBody() data: ChatMessage ): WsResponse<ChatMessage> {
    //this.server.emit("chat:message",  )
    console.log(data)
    return ({event: 'message', data});
  }

  
}
