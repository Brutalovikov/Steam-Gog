import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { Courses } from '../interfaces/courses.interface';


@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  //А это штука, где берутся актуальные курсы валют
  getCourses(): Promise<Courses> {
    return lastValueFrom(
      this.httpService.get('https://www.cbr-xml-daily.ru/latest.js').pipe(
      map(response => ({eur: response.data.rates.EUR, usd: response.data.rates.USD})),
    ))
  }
}
