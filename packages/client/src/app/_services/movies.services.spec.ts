import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.prod';
import { MoviesService } from './movies.services';
import { faker } from '@faker-js/faker';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve trend movies with proper mapping', () => {
    const expectedMovies = [
      {
        id: faker.database.mongodbObjectId(),
        position: 1,
        title: faker.company.name(),
        likes: faker.number.int(100),
        isLiked: faker.datatype.boolean(),
        tmdb_id: faker.number.int(),
        imagePath: faker.internet.url(),
      },
      {
        id: faker.database.mongodbObjectId(),
        position: 2,
        title: faker.company.name(),
        likes: faker.number.int(100),
        isLiked: faker.datatype.boolean(),
        tmdb_id: faker.number.int(),
        imagePath: faker.internet.url(),
      },
    ];

    const a = service.trendMovies().subscribe((movies) => {
      expect(movies).toEqual(expectedMovies);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/movies`);
    expect(req.request.method).toBe('GET');
  });

  it('should retrieve most liked movies with proper mapping', () => {
    const expectedMovies = [
      {
        id: faker.database.mongodbObjectId(),
        position: 1,
        title: faker.company.name(),
        likes: faker.number.int(100),
        isLiked: faker.datatype.boolean(),
        tmdb_id: faker.number.int(),
        imagePath: faker.internet.url(),
      },
      {
        id: faker.database.mongodbObjectId(),
        position: 2,
        title: faker.company.name(),
        likes: faker.number.int(100),
        isLiked: faker.datatype.boolean(),
        tmdb_id: faker.number.int(),
        imagePath: faker.internet.url(),
      },
    ];

    service.mostLiked().subscribe((movies) => {
      expect(movies).toEqual(expectedMovies);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/movies/most-liked`);
    expect(req.request.method).toBe('GET');
  });

  it('should send a like request for a movie', () => {
    const tmdbId = faker.number.int();

    service.like(tmdbId).subscribe();

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movies/toggle-like/${tmdbId}`
    );
    expect(req.request.method).toBe('POST');
  });
});
