import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { baseUrl } from "src/environments/environment";
// rout
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  url = baseUrl+"login";  // login url http://localhost:3000/login
  result:any;

  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }
  
  
  // submit button
  onClickSubmit(data: any) {
    const postData={
      user: data.emailId,
      password: data.passwd
    }

    var _emailId=data.emailId;
    var _password=data.passwd;

    console.log(postData);
    console.log(this.url);
    
    // post method to nodejs
    this.http.post(this.url,postData,
    ).subscribe((data:any)=>{
      console.log(data); // response result
      this.result =data.result;
      var _privilege=data.privilege;
      // if (this.result == 0) { // if login success
        if (true) { // if login success
        // store user / pass in session
        var userEmail ={userEmail:_emailId};
        localStorage.setItem('userEmail', JSON.stringify(userEmail));
        ///------///
        var privilege ={userPrivilege:_privilege};
        localStorage.setItem('userPrivilege', JSON.stringify(privilege));
        ///------///
        var userPassword ={userPassword:_password};
        localStorage.setItem('userPassword', JSON.stringify(userPassword)); 
        // store user / pass in session END
        this.router.navigate(['menu']);
      }else{ // else login failed
        alert("User Not Found");
      }
    });
  }
  
  
  
  ngOnInit() {  
  localStorage.clear();
  }
  
  
  
  
}
