import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create() {
    this.userRepository.save(
      this.userRepository.create({
        userName: 'user1',
        userPwd: 'p455w0rd',
      }),
    );
    this.userRepository.save(
      this.userRepository.create({
        userName: 'user2',
        userPwd: 'p455w0rd',
      }),
    );
    this.userRepository.save(
      this.userRepository.create({
        userName: 'user3',
        userPwd: 'p455w0rd',
      }),
    );
    this.userRepository.save(
      this.userRepository.create({
        userName: 'admin',
        userPwd: 'p455w0rd',
      }),
    );
    return 'This action adds a new user';
  }

  findByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { userName: username } });
  }
}
