import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MerchantProfilePage } from './merchant-profile.page';

describe('MerchantProfilePage', () => {
  let component: MerchantProfilePage;
  let fixture: ComponentFixture<MerchantProfilePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MerchantProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
