import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/auth-global/constants';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.userSecret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub };
  }
}
