import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { DBService } from 'src/db/db.service';
import { User } from 'src/users/users.dto';
import { AuthDto, Tokens, RefreshTokenDto, TokenPayload } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(readonly dbService: DBService) {}

  async login(data: AuthDto) {
    const users = await this.dbService.getBy('users', 'login', data.login);
    if (!users || !users.length) throw new ForbiddenException();
    if (await bcrypt.compare(data.password, users[0].password)) {
      return this.createTokens(users[0]);
    } else throw new ForbiddenException();
  }

  async refresh(data: RefreshTokenDto) {
    try {
      const decoded = jwt.verify(data.refreshToken, process.env.JWT_SECRET_REFRESH_KEY) as TokenPayload;
      const user = (await this.dbService.get('users', decoded.userId)) as User;
      if (!user) throw new ForbiddenException();
      return this.createTokens(user);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  createTokens(user: User) {
    const payload = { userId: user.id, login: user.login };
    const tokens: Tokens = {
      accessToken: jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRE_TIME }),
      refreshToken: jwt.sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
    return tokens;
  }
}
