import { Test, TestingModule } from '@nestjs/testing';
import { FoodCatalogController } from './food-catalog.controller';

describe('FoodCatalogController', () => {
  let controller: FoodCatalogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodCatalogController],
    }).compile();

    controller = module.get<FoodCatalogController>(FoodCatalogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
