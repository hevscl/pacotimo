import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacotimoComponent } from './pacotimo.component';

describe('PacotimoComponent', () => {
  let component: PacotimoComponent;
  let fixture: ComponentFixture<PacotimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacotimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacotimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
