import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { Courses } from '../interfaces/courses.interface';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class CurrencyService {
currencyApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService
  ) {
    this.currencyApiUrl = this.configService.get('CURRENCY_API_URL');
  }

  //А это штука, где берутся актуальные курсы валют
  getCourses(): Promise<Courses> {
    return lastValueFrom(
      this.httpService.get(this.currencyApiUrl).pipe(
      map(response => ({eur: response.data.rates.EUR, usd: response.data.rates.USD})),
    ))
  }
}
