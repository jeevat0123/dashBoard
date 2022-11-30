import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveMonitoringDashBoardComponent } from './live-monitoring-dash-board.component';

describe('LiveMonitoringDashBoardComponent', () => {
  let component: LiveMonitoringDashBoardComponent;
  let fixture: ComponentFixture<LiveMonitoringDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMonitoringDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveMonitoringDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
