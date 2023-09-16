import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('reverseGeoCoding', () => {
    const mockAreaMetadata = [
      {
        label_location: { latitude: 1.375, longitude: 103.839 },
        name: 'Ang Mo Kio',
      },
      {
        label_location: { latitude: 1.350772, longitude: 103.839 },
        name: 'Bishan',
      },
    ];
    const mockLocations = [
      {
        // amk
        latitude: 1.375925022,
        longitude: 103.8587986,
      },
      {
        // bishan
        latitude: 1.34355015,
        longitude: 103.8601984,
      },
      {
        // bishan [2]
        latitude: 1.35296,
        longitude: 103.85719,
      },
    ];
    it('should return all locations resolved', () => {
      expect(
        appController.reverseGeoCoding({
          areaMetadata: mockAreaMetadata,
          locations: mockLocations,
        }),
      ).toEqual({
        A: [
          {
            location: { latitude: 1.375925022, longitude: 103.8587986 },
            name: 'Ang Mo Kio',
          },
        ],
        B: [
          {
            location: { latitude: 1.34355015, longitude: 103.8601984 },
            name: 'Bishan',
          },
          {
            location: { latitude: 1.35296, longitude: 103.85719 },
            name: 'Bishan [2]',
          },
        ],
      });
    });
  });
});
