import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../jwt.strategy';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: Payload }>();
    return request.user;
  },
);
