import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMerchantPage } from './create-merchant.page';

describe('CreateMerchantPage', () => {
  let component: CreateMerchantPage;
  let fixture: ComponentFixture<CreateMerchantPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateMerchantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
