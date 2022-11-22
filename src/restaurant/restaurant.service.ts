import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Constants } from 'src/auth/constants';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private readonly httpService: HttpService,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    const dumb = await this.restaurantRepository.findOne({
      where: { name: restaurant.name, postcode: restaurant.postcode },
    });
    if (dumb == null) {
      const result = await this.restaurantRepository.save(restaurant);
      return result;
    } else {
      return null;
    }
  }

  async findAll(req) {
    const restaurant = await this.restaurantRepository.find({
      relations: ['reviews'],
    });
    const result = [];
    restaurant.forEach((restaurant) => {
      let food = 0,
        value = 0,
        service = 0;
      if (restaurant.reviews.length !== 0) {
        restaurant.reviews.forEach((review) => {
          food += review.food;
          value += review.value;
          service += review.service;
        });
        food /= restaurant.reviews.length;
        value /= restaurant.reviews.length;
        service /= restaurant.reviews.length;
      }
      result.push({
        name: restaurant.name,
        postcode: restaurant.postcode,
        photoUrl: restaurant.photoUrl,
        url: 'http://' + req.host + ':3000/' + restaurant.id,
        food: food.toFixed(1),
        value: value.toFixed(1),
        service: service.toFixed(1),
      });
    });
    return result;
  }

  async findOne(id: number, req: any) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: id },
      relations: ['reviews'],
    });
    let food = 0,
      value = 0,
      service = 0;
    if (restaurant.reviews.length !== 0) {
      restaurant.reviews.forEach((review) => {
        food += review.food;
        value += review.value;
        service += review.service;
      });
      food /= restaurant.reviews.length;
      value /= restaurant.reviews.length;
      service /= restaurant.reviews.length;
    }
    const { status, result, message } = await this.getWeather(
      restaurant.districtId,
    );
    console.log(status);
    console.log(result);
    console.log(message);
    return {
      name: restaurant.name,
      postcode: restaurant.postcode,
      photoUrl: restaurant.photoUrl,
      type: restaurant.type,
      desc: restaurant.desc,
      weahter: status === 0 ? result.now.text : '',
      temp: status === 0 ? result.now.temp : '',
      createTime: new Date(restaurant.createTime).toDateString(),
      food: food.toFixed(1),
      value: value.toFixed(1),
      service: service.toFixed(1),
      reviewUrl: 'http://' + req.host + ':3000/' + restaurant.id + '/review',
    };
  }

  getWeather(districtId: string) {
    console.log(districtId);
    return lastValueFrom(
      this.httpService
        .get('https://api.map.baidu.com/weather_abroad/v1/', {
          params: {
            district_id: districtId,
            data_type: 'now',
            ak: Constants.ak,
            language: 'en',
          },
        })
        .pipe(map((resp) => resp.data)),
    );
  }
}
