import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationDisplayComponent } from './delivery-location-display.component';

describe('DeliveryLocationDisplayComponent', () => {
  let component: DeliveryLocationDisplayComponent;
  let fixture: ComponentFixture<DeliveryLocationDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
