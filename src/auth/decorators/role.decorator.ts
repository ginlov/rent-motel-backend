import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
