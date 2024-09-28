import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from '../../environments/environment';
import { v4 as uuidv4} from 'uuid';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatMessage } from '@shared/types/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatService{
  private socket!: Socket;
  private jwt = uuidv4();
  private MESSAGE_EVENT = "chat:message";
  private message$ = new BehaviorSubject<ChatMessage>({ id: "unknown", name: "", message: "", createdAt: new Date(), receivedAt: null});

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
      message = {...message, receivedAt: new Date()};
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
