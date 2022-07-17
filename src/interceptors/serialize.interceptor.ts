import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto?: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        let newData = null;

        if (this.dto) {
          if (data.data?.items) {
            newData = data.data.items.map((dataItem: any) =>
              plainToInstance(this.dto, dataItem, {
                excludeExtraneousValues: true,
              }),
            );
          } else {
            newData = plainToInstance(this.dto, data.data, {
              excludeExtraneousValues: true,
            });
          }
        }

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: newData ? newData : data.data,
        };
      }),
    );
  }
}
