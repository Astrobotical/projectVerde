import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FoodCatalogModule } from './food-catalog/food-catalog.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { FarmersModule } from './farmers/farmers.module';
import { FoodModule } from './food/food.module';
import { BuyersModule } from './buyers/buyers.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
    }
  ), MongooseModule.forRootAsync({ imports: [ConfigModule], useFactory: async (configService: ConfigService) => ({ uri: configService.get<string>('MONGODB_URI'), }), inject: [ConfigService] }), AuthModule, FoodCatalogModule, UsersModule, FoodModule, BuyersModule, FarmersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
