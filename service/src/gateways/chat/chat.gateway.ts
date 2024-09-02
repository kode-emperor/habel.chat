import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { ChatMessage } from 'src/types/chat.message';
import { from, map, Observable } from 'rxjs';

//const port = 3000;
@WebSocketGateway({
  cors: {
    origin: "http://habel.chat.network"
  }
})
export class ChatGateway {
  @SubscribeMessage('chat:new-message')
  handleMessage(@MessageBody() res: ChatMessage ): WsResponse<ChatMessage> {
    const event = 'chat:new-message';
    const msg = [{id: 'hr92r93jr393020=r-', user: 'ergrgrgrgrg', message: 'fefegeeefefee'}];
    return {event, data}
  }
}
