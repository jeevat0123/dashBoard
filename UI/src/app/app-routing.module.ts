import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// custom
import { CommonModule } from '@angular/common';

// Finance DashBoard components
import {LoginComponent } from './finance-dashboard/login/login.component';  
import { MenuComponent } from './finance-dashboard/menu/menu.component'; 
import { BillingDataComponent } from './finance-dashboard/billing-data/billing-data.component';
import { LocationComponent } from './finance-dashboard/location/location.component';
// Live Monitoring components
import { LiveMonitoringDashBoardComponent } from './live-monitoring/live-monitoring-dash-board/live-monitoring-dash-board.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'billing-data', component: BillingDataComponent },
  { path: 'LiveMonitoring', component: LiveMonitoringDashBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
