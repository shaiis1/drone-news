import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from '../services/news.service';
import { GetNewsDto } from '../dto/get-news.dto';

// Mock implementation of NewsService
const mockNewsService = {
  findNews: jest.fn(),
  findAll: jest.fn(),
};

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: mockNewsService,
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = module.get<NewsService>(NewsService);
    jest.clearAllMocks();
  });

  describe('getNews', () => {
    it('should call findNews on the newsService with the correct query', async () => {
      const queryDto = new GetNewsDto();
      queryDto.q = 'test';

      // Assume findNews returns an empty array for simplicity
      mockNewsService.findNews.mockResolvedValue([]);

      await controller.getNews(queryDto);

      expect(service.findNews).toHaveBeenCalledWith('test');
    });
  });

  describe('getAll', () => {
    it('should call findAll on the newsService', async () => {
      // Assume findAll returns an object with results and count
      mockNewsService.findAll.mockResolvedValue({ results: [], count: 0 });

      await controller.getAll();

      expect(service.findAll).toHaveBeenCalled();
    });
    it('getAll should return the correct data structure from findAll service method', async () => {
        const mockData = { results: [{ id: 1, title: 'News Title' }], count: 1 };
        mockNewsService.findAll.mockResolvedValue(mockData);
      
        const response = await controller.getAll();
        expect(response).toEqual(mockData);
    });
    it('should handle service errors gracefully', async () => {
        mockNewsService.findAll.mockRejectedValue(new Error('Internal server error'));
        
        await expect(controller.getAll()).rejects.toThrow('Internal server error');
    });
  });
});
