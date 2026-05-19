import { IsUrl, IsNotEmpty } from 'class-validator';

export class GetInfoDto {
  @IsUrl({ protocols: ['https', 'http'] })
  @IsNotEmpty()
  url: string;
}
