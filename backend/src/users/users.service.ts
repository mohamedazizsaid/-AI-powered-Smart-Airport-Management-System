import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createDto: any): Promise<User> {
        const createdUser = new this.userModel(createDto);
        return createdUser.save();
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email }).exec();
    }

    async findOne(id: string): Promise<User | undefined> {
        return this.userModel.findById(id).exec();
    }
}
