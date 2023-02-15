import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  isVerified: boolean;
  @ApiProperty()
  frequency: string;
  @ApiProperty()
  country: string;
}
