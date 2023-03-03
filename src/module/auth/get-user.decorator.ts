import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator<string, ExecutionContext>(
  (data, ctx): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
