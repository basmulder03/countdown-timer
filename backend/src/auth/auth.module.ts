import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PasswordModule } from 'src/password/password.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/helpers/environment';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UsersModule,
    PasswordModule,
    JwtModule.register({
      global: true,
      secret: environment.jwt.SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
})
export class AuthModule {}
