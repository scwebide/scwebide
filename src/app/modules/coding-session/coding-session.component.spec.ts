import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingSessionComponent } from './coding-session.component';

describe('CodingSessionComponent', () => {
  let component: CodingSessionComponent;
  let fixture: ComponentFixture<CodingSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
