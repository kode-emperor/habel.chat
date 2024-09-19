import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environment';
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
    
    this.socket = io(`${environment.chat.http.url}/chat`,
    {
      path: "/socket.io/",
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
    console.log("new message from server")
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

  onConnectionError() {
    this.socket.on('connect_error', (err) => {
      console.log(`error connection: ${err}`);
    });
  }
}
