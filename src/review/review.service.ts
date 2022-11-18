import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    const dumb = await this.reviewRepository
      .createQueryBuilder()
      .where('user_id = :uid', { uid: createReviewDto.user_id })
      .andWhere('restaurant_id = :rid', { rid: createReviewDto.restaurant_id })
      .getOne();
    console.log(dumb);
    if (dumb !== null) {
      return null;
    }
    const review = await this.reviewRepository.save(createReviewDto);
    this.reviewRepository
      .createQueryBuilder()
      .relation(Review, 'user')
      .of(review.id)
      .set(createReviewDto.user_id);
    this.reviewRepository
      .createQueryBuilder()
      .relation(Review, 'restaurant')
      .of(review.id)
      .set(createReviewDto.restaurant_id);
    return review;
  }

  findAllByRid(id: number) {
    return this.reviewRepository
      .createQueryBuilder()
      .where('restaurant_id = :rid', { rid: id })
      .getMany();
  }
}
