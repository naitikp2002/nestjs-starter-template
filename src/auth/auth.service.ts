import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<object> {
    const hashPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashPassword,
    } as RegisterUserDto);
    console.log('user data', user);
    const token = await this.jwtService.signAsync({
      sub: user?.user?._id?.toString() || '',
    });
    console.log('token', token);
    return { token };
  }

  async loginUser(email: string, password: string): Promise<object> {
    const user = await this.userService.findByEmail(email);
    console.log('login user', user);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      
      throw new UnauthorizedException("Invalid Password");
    }
    const token = await this.jwtService.signAsync({
      sub: user._id.toString(),
      role: user.role,
    });
    return { access_token: token };
  }
}
