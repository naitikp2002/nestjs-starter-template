import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ){}
    
    async createUser(registerUserDto: RegisterUserDto): Promise<{user: UserDocument}> {
        try {    
            // console.log(registerUserDto);
            const createdUser = await this.userModel.create(registerUserDto);
            return { user: createdUser };
        } catch (error) {
            const DUPLICATE_ERROR_CODE = 11000;
            if (error.code === DUPLICATE_ERROR_CODE) {
                throw new ConflictException('User already exists with this email');
            }
            throw new BadRequestException(error.message);
        }
    }
    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return await this.userModel.findById(id).select('-password').exec();
    }
}
