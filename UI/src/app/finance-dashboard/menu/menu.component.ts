import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from "src/environments/environment";
// rout
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {  
  
  allMenuURL = baseUrl+"allMenu";  // login url http://localhost:3000/allMenu
  result:any;
  allMenuData:any;
  menuData:any;
  
  // get session storage
  userMenu: any;
  userPassword: any;
  userEmail: any;
  userPrivilege: any;
  
  allMenuListReq(){
    const postData={
      sessionId:"sessionid",
      userPassword:this.userPassword,
      userEmail:this.userEmail,
      userMenu:this.userMenu,
      userPrivilege:this.userPrivilege,
    }
    console.log("this.userPrivilege >>",postData);
    // post method to nodejs
    this.http.post(this.allMenuURL,postData).toPromise().then((allMenuData:any) =>{
      console.log(allMenuData); // response result
      this.allMenuData=allMenuData;
    });
  }
  
  menuReq(name :any){
    this.router.navigate(['locations']);
    
    // store user menu in session
    var userMenu ={userMenu:name};
    localStorage.setItem('userMenu', JSON.stringify(userMenu));
    // store user menu in session END
    
  }
  
  logout(){
    this.router.navigate(['']);
    localStorage.clear();
  }
  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) {}
  
  
  
  
  ngOnInit() {
    this.userMenu = localStorage.getItem('userMenu');
    this.userPassword = localStorage.getItem('userPassword');
    this.userEmail = localStorage.getItem('userEmail');
    this.userPrivilege = localStorage.getItem('userPrivilege');
    this.allMenuListReq();
  }
  
}
