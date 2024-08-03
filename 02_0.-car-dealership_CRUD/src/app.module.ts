import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';

@Module({
  imports: [CarsModule],  //Module
  controllers: [CarsController],  //Controller
  providers: [CarsService],  //Service
  exports: [],
})
export class AppModule {}

