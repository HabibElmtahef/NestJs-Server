import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Awel App Bi Nest Js Hahahahahaha';
  }
}
