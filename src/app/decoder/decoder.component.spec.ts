import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoderComponent } from './decoder.component';
import { FormsModule } from '@angular/forms';
import { DecoderService } from '../services/decoder.service';

describe('DecoderComponent', () => {
  let component: DecoderComponent;
  let fixture: ComponentFixture<DecoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations : [ DecoderComponent ],
      imports      : [ FormsModule ],
      providers    : [ DecoderService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture   = TestBed.createComponent(DecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
