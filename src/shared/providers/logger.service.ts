import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class MyLogger extends Logger {

  log(message: any, ...optionalParams: any[]) {
    // console.log(`Our log: ${message}`);
    super.log(`Our log: ${message}`);
  }

  fatal(message: any, ...optionalParams: any[]) {}

  error(message: any, ...optionalParams: any[]) {
    super.error(`Achtung: ${message}`);
  }

  warn(message: any, ...optionalParams: any[]) {}

  debug(message: any, ...optionalParams: any[]) {}

  verbose(message: any, ...optionalParams: any[]) {}
}