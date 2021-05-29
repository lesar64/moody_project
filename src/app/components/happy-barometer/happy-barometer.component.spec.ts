import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyBarometerComponent } from './happy-barometer.component';

describe('HappyBarometerComponent', () => {
  let component: HappyBarometerComponent;
  let fixture: ComponentFixture<HappyBarometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HappyBarometerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyBarometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
