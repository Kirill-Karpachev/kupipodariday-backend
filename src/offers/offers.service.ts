import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entities/offer.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  findAll(): Promise<Offer[]> {
    return this.offersRepository.find({ relations: ['item', 'user'] });
  }

  findOfferById(id: number): Promise<Offer> {
    return this.offersRepository.findOne({
      relations: ['item', 'user'],
      where: { id },
    });
  }

  async create(user: User, dto: CreateOfferDto): Promise<Offer> {
    const wishes = await this.wishesService.findWishById(dto.itemId);
    const { id } = user;
    const moneyDifference = wishes.price - wishes.raised;
    const wish = await this.wishesService.findWishById(wishes.id);
    const raised = wish.raised + dto.amount;

    if (dto.amount > moneyDifference) {
      throw new BadRequestException(
        'Сумма взноса превышает сумму остатка стоимости подарка',
      );
    }

    await this.wishesService.updateByRaised(wish.id, raised);

    if (id === wishes.owner.id) {
      throw new BadRequestException('Вы не можете внести за свой подарок');
    }

    if (wishes.raised > 0 && wishes.price !== undefined) {
      throw new ConflictException('Обновление запрещено');
    }
    return this.offersRepository.save({
      ...dto,
      user,
      item: wish,
    });
  }
}
