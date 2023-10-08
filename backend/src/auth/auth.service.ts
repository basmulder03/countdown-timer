import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { NoEnabledPasswordsException } from 'src/exceptions/no-enabled-passwords.exception';
import { NoPasswordsException } from 'src/exceptions/no-passwords.exception';
import { SamePasswordAsPreviousException } from 'src/exceptions/same-password-as-previous.exception';
import { UnknownUserException } from 'src/exceptions/unknown-user.exception';
import { environment } from 'src/helpers/environment';
import { PasswordService } from 'src/password/password.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) throw new UnknownUserException();
    const passwords = await this.passwordService.getAllOfUser(user.id);
    if (passwords.length <= 0) throw new NoPasswordsException();
    if (!passwords.some((p) => p.enabled))
      throw new NoEnabledPasswordsException();
    const currentPassword = passwords[0];
    if (currentPassword.enabled) throw new NoEnabledPasswordsException();
    if (!(await bcrypt.compare(password, currentPassword.hash)))
      throw new UnauthorizedException();
    return {
      access_token: await this.jwtService.signAsync({
        username: user.username,
        permissions: user.role.permissions,
      }),
    };
  }

  async register(username: string) {
    return this.userService.createNew(username);
  }
}
