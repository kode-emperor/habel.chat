import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

const port = 3000;
@WebSocketGateway(port, {
  cors: {
    origin: "http://habel.chat.network"
  }
})
export class ChatGateway {
  @SubscribeMessage('chat:new-message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
