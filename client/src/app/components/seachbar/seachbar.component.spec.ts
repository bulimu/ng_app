import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachbarComponent } from './seachbar.component';

describe('SeachbarComponent', () => {
  let component: SeachbarComponent;
  let fixture: ComponentFixture<SeachbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeachbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeachbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
