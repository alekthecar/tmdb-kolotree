import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesNavigationComponent } from './movies-navigation.component';

describe('MoviesNavigationComponent', () => {
  let component: MoviesNavigationComponent;
  let fixture: ComponentFixture<MoviesNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
