import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaadpaalDetailComponent } from './laadpaal-detail.component';

describe('LaadpaalDetailComponent', () => {
  let component: LaadpaalDetailComponent;
  let fixture: ComponentFixture<LaadpaalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaadpaalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaadpaalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
