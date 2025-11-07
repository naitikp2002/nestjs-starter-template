import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/registerUser.dto';
import { AuthGuard } from './auth.guards';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }


    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto): Promise<object> {
        const result = await this.authService.registerUser(registerUserDto);
        return result;
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: { email: string; password: string }): Promise<object> {
        const result = await this.authService.loginUser(loginUserDto.email, loginUserDto.password);
        return result;
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const user = req.user.sub;
        const result = await this.userService.findById(user);
        if (!result) {
            throw new Error('User not found');
        }
        return result;
    }
}
