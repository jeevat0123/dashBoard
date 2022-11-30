import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// custom
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
// Finance DashBoard components
import { BillingDataComponent } from './finance-dashboard/billing-data/billing-data.component';
import { LocationComponent } from './finance-dashboard/location/location.component';
import { LoginComponent } from './finance-dashboard/login/login.component';
import { MenuComponent } from './finance-dashboard/menu/menu.component';
// Live Monitoring components
import { LiveMonitoringDashBoardComponent } from './live-monitoring/live-monitoring-dash-board/live-monitoring-dash-board.component';
// routing
// import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [
    AppComponent,
  // Finance DashBoard
    LoginComponent,
    MenuComponent,
    BillingDataComponent,
    LocationComponent,
  // live monitoring
    LiveMonitoringDashBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
