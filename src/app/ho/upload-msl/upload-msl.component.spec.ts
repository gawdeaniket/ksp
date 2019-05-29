import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMslComponent } from './upload-msl.component';

describe('UploadMslComponent', () => {
  let component: UploadMslComponent;
  let fixture: ComponentFixture<UploadMslComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMslComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
