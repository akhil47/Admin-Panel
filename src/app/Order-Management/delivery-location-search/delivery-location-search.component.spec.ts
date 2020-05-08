import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLocationSearchComponent } from './delivery-location-search.component';

describe('DeliveryLocationSearchComponent', () => {
  let component: DeliveryLocationSearchComponent;
  let fixture: ComponentFixture<DeliveryLocationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLocationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
