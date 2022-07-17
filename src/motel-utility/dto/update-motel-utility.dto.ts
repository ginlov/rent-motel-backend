import { PartialType } from '@nestjs/swagger';
import { CreateMotelUtilityDto } from './create-motel-utility.dto';

export class UpdateMotelUtilityDto extends PartialType(CreateMotelUtilityDto) {}
