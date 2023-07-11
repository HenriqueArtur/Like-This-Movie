import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingPageComponent } from './trending-page.component';

describe('MoviePageComponent', () => {
  let component: TrendingPageComponent;
  let fixture: ComponentFixture<TrendingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendingPageComponent],
    });
    fixture = TestBed.createComponent(TrendingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
