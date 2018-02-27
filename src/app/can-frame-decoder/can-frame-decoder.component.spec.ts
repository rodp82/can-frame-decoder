import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanFrameDecoderComponent } from './can-frame-decoder.component';

describe('CanFrameDecoderComponent', () => {
  let component: CanFrameDecoderComponent;
  let fixture: ComponentFixture<CanFrameDecoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanFrameDecoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanFrameDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
