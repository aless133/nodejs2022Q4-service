import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path = request.url.split('/');
    if (['', 'auth', 'doc', 'test'].includes(path[1])) return true;
    const auth = request.headers['authorization'];
    if (!auth) return false;
    const auth1 = auth.split(' ');
    if (auth1[0] != 'Bearer') return false;
    try {
      jwt.verify(auth1[1], process.env.JWT_SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }
}
