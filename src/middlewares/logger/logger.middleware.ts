import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(req.method, req.url);
    console.log('logger...');
    next();
  }
}
