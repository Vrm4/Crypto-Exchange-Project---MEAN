import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOkComponent } from './header-ok.component';

describe('HeaderOkComponent', () => {
  let component: HeaderOkComponent;
  let fixture: ComponentFixture<HeaderOkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
