import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
