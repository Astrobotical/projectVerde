import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Farmer, FarmerSchema } from '../users/users.schema';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { FarmersController } from './farmers.controller';
import { FarmersService } from './farmers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farmer.name, schema: FarmerSchema }]), // ✅ Ensure the Farmer model is registered
    forwardRef(() => UsersModule), // ✅ Import UsersModule if UsersService is needed
    forwardRef(() => AuthModule), // ✅ Import AuthModule for AuthenticationService
  ],
  controllers: [FarmersController],
  providers: [FarmersService],
  exports: [FarmersService], // ✅ Export FarmersService if used elsewhere
})
export class FarmersModule {}
