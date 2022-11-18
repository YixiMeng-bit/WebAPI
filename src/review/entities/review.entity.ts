import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', nullable: false, default: 0 })
  service: number;
  @Column({ type: 'int', nullable: false, default: 0 })
  value: number;
  @Column({ type: 'int', nullable: false, default: 0 })
  food: number;
  @Column({ type: 'longtext' })
  comment: string;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reviews)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
