import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { Courses } from '../interfaces/courses.interface';


@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  getCourses(): Promise<Courses> {
    return lastValueFrom(
      this.httpService.get('https://www.cbr-xml-daily.ru/latest.js').pipe(
      map(response => ({eur: response.data.rates.EUR, usd: response.data.rates.USD})),
    ))
  }

  /*getCourses(): Observable<Courses> {
    return this.httpService.get('https://www.cbr-xml-daily.ru/latest.js').pipe(
      map(response => ({eur: response.data.rates.EUR, usd: response.data.rates.USD})),
    )
  }*/

  /*public async getCourses(): Promise<number[]> {
    let all = await this.findAll();
    console.log(1, all);
    //let data = all['data'];
    //let rates = data['rates'];

    //const euroCourse = rates['EUR'];
    //const dollarCourse = rates['USD'];
    //const euroCourse = all.data.rates.EUR;
    //const dollarCourse = all.data.rates.USD;

    return [all.EUR, all.USD];
  }*/
}
