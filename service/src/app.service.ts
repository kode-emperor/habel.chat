import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
	    name: 'Kimberley',
	    message: "You farted",
	    code: 200
    };
  }
}
