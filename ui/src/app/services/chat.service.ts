import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environments.environment';
import { v4 as uuidv4} from 'uuid';
import { Observable, BehaviorSubject } from 'rxjs';

interface ChatMessage {
  id: string,
  name: string;
  message: string;
  createdAt: Date;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService{
  private socket!: Socket;
  private jwt = uuidv4();
  private MESSAGE_EVENT = "chat:message";
  private message$ = new BehaviorSubject<ChatMessage>({ id: "unknown", name: "", message: "", createdAt: new Date()});

  constructor() { }
  setupSocketConnection() {
    this.socket = io("http://localhost:3000/chat",
      {
      transports: ['websocket'],
      query: {jwt:  this.jwt}
    });
    console.log("now listening for message from server...")
  }

  disconnect() {
    if(this.socket) {
      this.socket.disconnect()
    }
  }

  onConnect() {
    this.socket.on('connect', () => {
      console.log(`user connected`);
    })
  }

  OnReceivedMessage() {
    this.socket.on(this.MESSAGE_EVENT, message => {
     this.message$.next(message);
    })
    return this.message$.asObservable();
  }

  Send(message: ChatMessage) {
    if(this.socket) {
      this.socket.emit(this.MESSAGE_EVENT, message);
      console.log(`Sent message [${message}]`)
    }
  }

}
