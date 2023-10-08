import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PasswordService],
  controllers: [PasswordController],
  exports: [PasswordService],
  imports: [PrismaModule, UsersModule],
})
export class PasswordModule {}
