import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadinvoiceComponent } from './downloadinvoice.component';

describe('DownloadinvoiceComponent', () => {
  let component: DownloadinvoiceComponent;
  let fixture: ComponentFixture<DownloadinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
