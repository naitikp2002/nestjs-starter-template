import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({})],
})
export class UserModule {}
