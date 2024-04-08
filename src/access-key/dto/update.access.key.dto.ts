import { IsNumber, IsDateString, IsOptional } from 'class-validator';

export class UpdateAccessKeyDto {
  @IsNumber()
  @IsOptional()
  rateLimit?: number;

  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}
