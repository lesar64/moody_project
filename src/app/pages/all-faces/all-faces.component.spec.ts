import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFacesComponent } from './all-faces.component';

describe('AllFacesComponent', () => {
  let component: AllFacesComponent;
  let fixture: ComponentFixture<AllFacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
