import { IsUrl, IsString, IsNotEmpty, Matches } from 'class-validator';

export class DownloadDto {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[\w+.-]+$/) // solo caracteres seguros
  formatId: string;
}
