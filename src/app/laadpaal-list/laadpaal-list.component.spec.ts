import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaadpaalListComponent } from './laadpaal-list.component';

describe('LaadpaalListComponent', () => {
  let component: LaadpaalListComponent;
  let fixture: ComponentFixture<LaadpaalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaadpaalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaadpaalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
