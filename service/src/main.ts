import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

const certFile  = readFileSync('/etc/letsencrypt/live/api.habel.chat/cert.pem');
const keyFile = readFileSync('/etc/letsencrypt/live/api.habel.chat/privkey.pem');
const ca = readFileSync('/etc/letsencrypt/live/api.habel.chat/chain.pem');

const opts = {
  httpsOptions: {
    key: keyFile,
    cert: certFile,
    ca: ca,
    requestCert: false,
    rejectUnauthorized: false
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
