import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';

import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  // todo reponse custom 확인
  // https://docs.nestjs.com/graphql/other-features#exception-filters
  catch(exception: HttpException, host: ArgumentsHost) {
    // const gqlHost = GqlArgumentsHost.create(host);
    this.logger.error(exception.stack);
    return exception;
  }
}
