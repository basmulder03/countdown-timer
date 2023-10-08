import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PasswordService],
  controllers: [PasswordController],
  exports: [PasswordService],
  imports: [PrismaModule],
})
export class PasswordModule {}
