import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environments.environment';


interface ChatResponse {
  user: string;
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
  }

  disconnect() {
    if(this.socket) {
      this.socket.disconnect()
    }
  }

  onConnect() {
    this.socket.on('connected', (res:{user: string, message: string}) => console.log(`user ${res.user} connected`))
  }

  onMessage(reply: ChatResponse) {
    if(this.socket) {
      this.socket.on('chat:new-message', (res: ChatResponse) => this.socket.emit('chat:new-message', reply))
    } else {
      console.error("Invalid Socket Error: calling socket-service on a disconnected socket")
    }
  }

}
