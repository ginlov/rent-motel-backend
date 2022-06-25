import { FindManyOptions } from 'typeorm';
import { QueryList } from './interfaces';
import { set } from 'lodash';
import { BadRequestException } from '@nestjs/common';

export const transformQuery = (query: QueryList): FindManyOptions<any> => {
  const filters = {};

  if ('order-by' in query) {
    switch (query['order-by']) {
      case 'price':
        set(filters, 'order.price', 'ASC');
        break;
      case 'price-desc':
        set(filters, 'order.price', 'DESC');
        break;
    }
  }

  if ('limit' in query) {
    if (query['limit'] <= 0) {
      throw new BadRequestException(
        'Invalid limit (a valid value must be a positive number).',
      );
    }
    set(filters, 'take', query['limit']);
  }

  if ('offset' in query) {
    if (query['offset'] <= 0) {
      throw new BadRequestException(
        'Invalid offset (a valid value must be a positive number).',
      );
    }
    set(filters, 'skip', query['offset'] - 1);
  }

  return filters;
};
