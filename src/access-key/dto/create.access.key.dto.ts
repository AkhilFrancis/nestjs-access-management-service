import { IsNumber, IsDateString } from 'class-validator';

export class CreateAccessKeyDto {
  @IsNumber()
  rateLimit: number;

  @IsDateString()
  expiresAt: string;

  @IsNumber()
  rateLimitPeriod: number;
}
