import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../Orders/entities/Order';

import { User } from '../../users/entities/User';
import { Genres } from './Genres';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => User, (user) => user.games)
  users: User[];

  @ManyToOne(() => Genres, (genres) => genres.games)
  genreId: Genres;

  @ManyToMany(() => Order, (order) => order.games)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
