import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function TransformResponse() {
  return UseInterceptors(new TransformResponseInterceptor());
}

export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: data.data,
        };
      }),
    );
  }
}
