import { PartialType } from '@nestjs/swagger';
import { CreateUtilityDto } from './create-utility.dto';

export class UpdateUtilityDto extends PartialType(CreateUtilityDto) {}
