import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../entity/user.entity';
import { ICreateUserDto } from '../dto/create-user.dto.interface';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async getOneById(id: number): Promise<User> {
    return await this.userRepository.getOneById(id);
  }

  async getOneByEmail(email: string): Promise<User> {
    return await this.userRepository.getOneByEmail(email);
  }

  async create(createUserDto: ICreateUserDto): Promise<User> {
    const mappedUser = this.userMapper.fromCreateDtoToEntity(createUserDto);
    return await this.userRepository.create(mappedUser);
  }
}
