import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SamePasswordAsPreviousException } from 'src/exceptions/same-password-as-previous.exception';
import { UnknownUserException } from 'src/exceptions/unknown-user.exception';
import { environment } from 'src/helpers/environment';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PasswordService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService,
  ) {}

  async getAllOfUser(userId: string) {
    return this.prisma.password.findMany({
      where: {
        userId,
      },
      select: {
        hash: true,
        enabled: true,
        disabledAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createNewPassword(userId: string, hash: string) {
    await this.prisma.password.updateMany({
      where: {
        userId,
      },
      data: {
        enabled: false,
      },
    });
    return await this.prisma.password.create({
      data: {
        hash,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async firstPassword(username: string, password: string) {
    const user = await this.userService.getUserId(username);
    if (!user) throw new UnknownUserException();
    const currentPasswords = await this.getAllOfUser(user.id);
    if (currentPasswords.length > 0) throw new UnauthorizedException();
    const salt = await bcrypt.genSalt(environment.password.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    await this.createNewPassword(user.id, hash);
    return true;
  }

  async newPassword(username: string, password: string) {
    const currentPasswords = await this.getAllOfUser(userId);
    if (currentPasswords.length !== 0) {
      const passwordsToCheck = currentPasswords.slice(
        0,
        currentPasswords.length >= 5 ? 5 : currentPasswords.length,
      );
      for (const passwordToCheck of passwordsToCheck) {
        if (await bcrypt.compare(password, passwordToCheck.hash))
          throw new SamePasswordAsPreviousException();
      }
    }
    const salt = await bcrypt.genSalt(environment.password.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    await this.createNewPassword(userId, hash);
    return true;
  }
}
