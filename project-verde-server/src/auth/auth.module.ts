import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCredentialsSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserCredentials', schema: UserCredentialsSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UsersModule),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthModule {}
