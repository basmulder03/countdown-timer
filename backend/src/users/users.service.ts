import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserAlreadyExistsException } from 'src/exceptions/user-already-exists.exception';
import { CONSTANTS } from 'src/helpers/consts';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        role: {
          include: {
            permissions: {
              select: {
                key: true,
              },
            },
          },
        },
        username: true,
      },
    });
  }

  async getUserId(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
  }

  async createNew(username: string) {
    if (
      (await this.prisma.user.findUnique({
        where: {
          username,
        },
      })) != null
    )
      throw new UserAlreadyExistsException();
    return await this.prisma.user.create({
      data: {
        username,
        role: {
          connectOrCreate: {
            create: {
              name: CONSTANTS.defaultRole,
            },
            where: {
              name: CONSTANTS.defaultRole,
            },
          },
        },
      },
      select: {
        username: true,
        role: {
          select: {
            permissions: {
              select: {
                key: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });
  }
}
