import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  SignInCredentialsDto,
  SignUpCredentialsDto,
} from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(signUpCredentialsDto);
  }

  async signIn(
    authCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
