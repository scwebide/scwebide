import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWindowComponent } from './post-window.component';

describe('PostWindowComponent', () => {
  let component: PostWindowComponent;
  let fixture: ComponentFixture<PostWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
