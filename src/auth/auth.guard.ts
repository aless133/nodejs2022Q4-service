import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const path = request.url.split('/');
    if (['', 'auth', 'doc', 'test'].includes(path[1])) return true;
    const auth = request.headers['authorization'];
    if (!auth) throw new UnauthorizedException();
    const auth1 = auth.split(' ');
    if (auth1[0] != 'Bearer') throw new UnauthorizedException();
    try {
      jwt.verify(auth1[1], process.env.JWT_SECRET_KEY);
      return true;
    } catch (err) {
      throw new UnauthorizedException();
      // return false;
    }
  }
}
