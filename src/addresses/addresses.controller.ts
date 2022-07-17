import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddressesService } from './addresses.service';

@Controller('addresses')
@ApiTags('Address')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  // @Post()
  // create(@Body() createAddressDto: CreateAddressDto) {
  //   return this.addressesService.create(createAddressDto);
  // }

  // @Get()
  // findAll() {
  //   return this.addressesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.addressesService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
  //   return this.addressesService.update(id, updateAddressDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.addressesService.remove(id);
  // }
}
