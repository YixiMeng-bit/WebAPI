import { Review } from 'src/review/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 10, nullable: false })
  postcode: string;
  @Column({ name: 'photo_url', type: 'text' })
  photoUrl: string;
  @Column({ type: 'varchar', length: 255 })
  type: string;
  @Column({ type: 'longtext' })
  desc: string;
  @Column({ name: 'district_id', type: 'varchar', length: 50 })
  districtId: string;
  @Column({ name: 'create_user', type: 'int', nullable: false })
  createUser: number;
  @CreateDateColumn({ name: 'create_time', type: 'timestamp', nullable: false })
  createTime: number;
  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}
