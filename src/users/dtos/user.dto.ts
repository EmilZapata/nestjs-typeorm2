import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'password of user' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'role of user' })
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'customer of user' })
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
