import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThan, Repository, UpdateResult } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  findAll() {
    return this.wishesRepository.find();
  }

  async findLastWishes(): Promise<Wish[]> {
    return await this.wishesRepository.find({
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  async findTopWishes(): Promise<Wish[]> {
    return await this.wishesRepository.find({
      order: {
        copied: 'DESC',
      },
      where: {
        copied: MoreThan(0),
      },
      take: 10,
    });
  }

  async create(owner: User, dto: CreateWishDto): Promise<Wish> {
    return await this.wishesRepository.save({
      ...dto,
      owner: owner,
    });
  }

  async findOne(wishId: number): Promise<Wish> {
    return await this.wishesRepository.findOne({
      where: {
        id: wishId,
      },
      relations: {
        owner: {
          wishes: true,
          wishlists: true,
        },
        offers: {
          user: true,
          item: true,
        },
      },
    });
  }

  findWishesByUserId(userId: number): Promise<Wish[]> {
    return this.wishesRepository.find({
      where: { owner: { id: userId } },
      relations: {
        owner: {
          wishes: true,
          wishlists: true,
        },
        offers: {
          user: true,
          item: true,
        },
      },
    });
  }

  async updateOne(wishId: number, dto: UpdateWishDto, userId: number) {
    const wish = await this.findOne(wishId);

    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Это желание другого пользователя');
    }
    if (wish.raised > 0 && wish.price !== undefined) {
      throw new ConflictException('Обновление запрещено');
    }
    return await this.wishesRepository.update(wishId, dto);
  }

  async updateByRaised(id: number, newRaised: number): Promise<UpdateResult> {
    return await this.wishesRepository.update(
      { id: id },
      { raised: newRaised },
    );
  }

  async removeWishes(wishId: number, userId: number) {
    const wish = await this.findOne(wishId);
    if (userId !== wish.owner.id) {
      throw new ForbiddenException('Это желание другого пользователя');
    }
    if (wish.raised > 0 && wish.price !== undefined) {
      throw new ConflictException('Удаление запрещено');
    }
    await this.wishesRepository.delete(wishId);
    return wish;
  }

  findMany(items: number[]): Promise<Wish[]> {
    return this.wishesRepository.findBy({ id: In(items) });
  }

  async copyWish(wishId: number, user: User) {
    const wish = await this.findOne(wishId);
    if (user.id === wish.owner.id) {
      throw new ForbiddenException('Желание уже есть в вашем списке');
    }
    await this.wishesRepository.update(wishId, {
      copied: (wish.copied += 1),
    });

    const wishCopy = {
      ...wish,
      raised: 0,
      owner: user.id,
      offers: [],
    };
    await this.create(user, wishCopy);
    return {};
  }
}
