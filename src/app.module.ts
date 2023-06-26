import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';
import { WishesModule } from './wishes/wishes.module';
import { OffersModule } from './offers/offers.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    OffersModule,
    WishlistsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
