import { Review } from 'src/review/entities/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_name', type: 'varchar', nullable: false, length: 20 })
  userName: string;
  @Column({ name: 'user_pwd', type: 'varchar', nullable: false, length: 20 })
  userPwd: string;
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
