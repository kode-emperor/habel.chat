import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environments.environment';


interface ChatResponse {
  id: string,
  name: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService{
  private socket: any;

  constructor() { }
  setupSocketConnection() {
    this.socket = io("http://habel.chat.network:3000/")
    console.log("now lisening for message from server...")
  }

  disconnect() {
    if(this.socket) {
      this.socket.disconnect()
    }
  }

  onConnect() {
    this.socket.on('connected', (res: {id: string, name: string,message: string}) => console.log(`user ${res.id} connected`))
  }

  onMessage(reply: ChatResponse) {
    console.log(`user: ${reply.name}, message: ${reply.message}`);
    if(this.socket) {
      this.socket.on('chat:new-message', (res: ChatResponse) => {
        console.log("Received new message from server: "+ res);
        this.socket.emit('chat:new-message', reply);
        console.log("sending reply "+ reply)
      })
    } else {
      console.error("Invalid Socket Error: calling socket-service on a disconnected socket")
    }
  }

}
