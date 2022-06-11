import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Game } from '../../games/entities/Game';

import { User } from '../../users/entities/User';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @ManyToMany(() => Game, (game) => game.orders)
  games: Game[];

  @ManyToOne(() => User, (user) => user.orders)
  customerId: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
