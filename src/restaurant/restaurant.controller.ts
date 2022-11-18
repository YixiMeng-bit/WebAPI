import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { ReviewService } from 'src/review/review.service';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly reviewService: ReviewService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto, @Req() req) {
    createRestaurantDto.createUser = req.user.userId;
    const result = this.restaurantService.create(createRestaurantDto);
    if (result == null) {
      return {
        errorCode: 100,
        errMsg: 'Duplicate name and postcode of restaurant',
      };
    } else {
      return {
        errorCode: 0,
        errMsg: null,
        content: result,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req) {
    return this.restaurantService.findAll(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.restaurantService.findOne(+id, req);
  }

  @Get(':id/review')
  @UseGuards(AuthGuard('jwt'))
  findReviewByRid(@Param('id') id: string, @Req() req) {
    return this.reviewService.findAllByRid(+id);
  }

  @Post(':id/review')
  @UseGuards(AuthGuard('jwt'))
  async createReviewByRid(
    @Req() req,
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    createReviewDto.user_id = req.user.userId;
    createReviewDto.restaurant_id = +id;
    const result = await this.reviewService.create(createReviewDto);
    if (result == null) {
      return {
        errorCode: 101,
        errMsg: 'User has already posted the reviews',
      };
    } else {
      return {
        errorCode: 0,
        errMsg: null,
        content: result,
      };
    }
  }
}
