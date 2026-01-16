import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        // Note: In real app, check if user exists and password matches
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            // Return user without sensitive data
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(userDto: any) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(userDto.password, salt);
        // Create new DTO with passwordHash
        const newUser = { ...userDto, passwordHash: hash };
        return this.usersService.create(newUser);
    }
}
