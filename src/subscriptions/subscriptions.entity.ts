import {
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: 'NOW()',
    onUpdate: 'NOW()',
  })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 10 })
  frequency: string;

  @Column({ type: 'varchar', length: 2 })
  country: string;
}
