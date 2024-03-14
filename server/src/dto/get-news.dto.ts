import { IsString, IsOptional, Length } from 'class-validator';

export class GetNewsDto {
  @IsString()
  @IsOptional()
  @Length(1, 500)
  q?: string;
}
