import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './application/user.service';
import { PrismaUserRepository } from './infrastructure/prisma.user.repository';
import { BcryptHashUtil } from './infrastructure/bcrypt.hash.util';
import { PrismaService } from '../config/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'IHashUtil', useClass: BcryptHashUtil },
  ],
})
export class UserModule {}
