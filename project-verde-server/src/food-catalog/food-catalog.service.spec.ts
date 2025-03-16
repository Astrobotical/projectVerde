import { Test, TestingModule } from '@nestjs/testing';
import { FoodCatalogService } from './food-catalog.service';

describe('FoodCatalogService', () => {
  let service: FoodCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodCatalogService],
    }).compile();

    service = module.get<FoodCatalogService>(FoodCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
