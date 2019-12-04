import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KspdashboardComponent } from './kspdashboard.component';

describe('KspdashboardComponent', () => {
  let component: KspdashboardComponent;
  let fixture: ComponentFixture<KspdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KspdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KspdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
