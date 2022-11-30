import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from "src/environments/environment";
// rout
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  allLocationURL = baseUrl+"allLocation";  // login url http://localhost:3000/allLocation
// session storage
  userMenu: any;
  userPassword: any;
  userEmail: any;
  userLocation: any;
  userPrivilege: any;
  allLocationData: any;


  allLocationListReq(){
    const postData={
      sessionId:"sessionid",
      userPassword:this.userPassword,
      userEmail:this.userEmail,
      userMenu:this.userMenu,
      userLocation:this.userLocation,
      userPrivilege:this.userPrivilege,
    }
    console.log("this.userPrivilege >>",postData);
    // post method to nodejs
    this.http.post(this.allLocationURL,postData).toPromise().then((allLocationData:any) =>{
     console.log(allLocationData); // response result
     this.allLocationData=allLocationData;
   });
 }


  locationReq(name :any){
    this.router.navigate(['billing-data']);
  
  // store user menu in session
    var userLocation={userLocation:name};
    localStorage.setItem('userLocation', JSON.stringify(userLocation));
  // store user menu in session END
  
   }
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.userMenu = localStorage.getItem('userMenu');
    this.userPassword = localStorage.getItem('userPassword');
    this.userEmail = localStorage.getItem('userEmail');
    this.userPrivilege = localStorage.getItem('userPrivilege');
    this.userLocation = localStorage.getItem('userLocation');
    this.allLocationListReq();
  }

}
