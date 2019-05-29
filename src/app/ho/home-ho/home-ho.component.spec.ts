import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHoComponent } from './home-ho.component';

describe('HomeHoComponent', () => {
  let component: HomeHoComponent;
  let fixture: ComponentFixture<HomeHoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeHoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeHoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
