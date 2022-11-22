import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Restaurant]),
    UserModule,
  ],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
