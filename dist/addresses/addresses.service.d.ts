import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
export declare class AddressesService {
    private addressesRepository;
    constructor(addressesRepository: Repository<Address>);
    create(createAddressDto: CreateAddressDto): Promise<Address>;
}
