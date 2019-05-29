import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebranchComponent } from './homebranch.component';

describe('HomebranchComponent', () => {
  let component: HomebranchComponent;
  let fixture: ComponentFixture<HomebranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
