import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWallet } from './new-wallet';

describe('NewWallet', () => {
  let component: NewWallet;
  let fixture: ComponentFixture<NewWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
