import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatinInvoiceComponent } from './satin-invoice.component';

describe('SatinInvoiceComponent', () => {
  let component: SatinInvoiceComponent;
  let fixture: ComponentFixture<SatinInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatinInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatinInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
