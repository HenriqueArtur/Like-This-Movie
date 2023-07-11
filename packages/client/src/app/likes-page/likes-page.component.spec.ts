import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesPageComponent } from './likes-page.component';

describe('LikesPageComponent', () => {
  let component: LikesPageComponent;
  let fixture: ComponentFixture<LikesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LikesPageComponent]
    });
    fixture = TestBed.createComponent(LikesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
