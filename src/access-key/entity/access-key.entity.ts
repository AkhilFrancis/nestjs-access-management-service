import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AccessKey {
  @PrimaryGeneratedColumn('uuid')
  id: string; // using the id as the access key for simplicity

  @Column()
  rateLimit: number;

  @Column()
  rateLimitPeriod: number; // In Seconds

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
