import { SetMetadata } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { CONSTANTS } from 'src/helpers/consts';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(CONSTANTS.permissionsKey, permissions);
