import { Component, OnInit } from '@angular/core';
// http-request
import { HttpClient  } from '@angular/common/http';
// routing
import { ActivatedRoute, Router } from '@angular/router';
import {  FormControl, FormGroup } from '@angular/forms';
import { interval  } from'rxjs';
// environment
import { baseUrl } from "src/environments/environment";

@Component({
  selector: 'app-live-monitoring-dash-board',
  templateUrl: './live-monitoring-dash-board.component.html',
  styleUrls: ['./live-monitoring-dash-board.component.scss']
})
export class LiveMonitoringDashBoardComponent implements OnInit {
  form: FormGroup = new FormGroup({
    userID: new FormControl(''),
    password: new FormControl(''),
  });
  URL = baseUrl+"googleSheet";
  submitted = false;
  login_Validate:boolean=true;
  total: any;
  connected:any;
  notConnected:any;
  timerSubscription: any;
  callName: any;
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }
  onSubmit(): void {
    this.submitted = true;
    console.log(JSON.stringify(this.form.value, null, 2));
    const _userID=this.form.value.userID;
    const _password=this.form.value.password;
    if( _userID =="2258" && _password =="123!@#$" ){
      this.login_Validate=false;
    }else{
      alert("Not an User");
    }
  }
  logout(){
    this.login_Validate=true;
  }
  onClickSubmit() {
    console.log("click");
    this.http.post<any>(this.URL,{ title: ' Live Monitoring ' }).subscribe(data => {
    this.total = data[0][0];
    this.connected = data[0][1];
    this.notConnected = data[0][2];
    this.callName= data[0][3];
  });
}

ngOnInit() {
  interval(10000).subscribe(x => {
    this.onClickSubmit();
  });
}

}
