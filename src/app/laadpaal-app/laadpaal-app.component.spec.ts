import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaadpaalAppComponent } from './laadpaal-app.component';

describe('LaadpaalAppComponent', () => {
  let component: LaadpaalAppComponent;
  let fixture: ComponentFixture<LaadpaalAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaadpaalAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaadpaalAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
