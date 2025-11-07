import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, ConfigModule.forRoot(), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET ?? 'secret',
    signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600') },
  })],
})
export class AuthModule {}
