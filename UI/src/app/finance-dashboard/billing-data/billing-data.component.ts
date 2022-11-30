import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from "src/environments/environment";
// rout
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-billing-data',
  templateUrl: './billing-data.component.html',
  styleUrls: ['./billing-data.component.scss']
})
export class BillingDataComponent implements OnInit {
  menuURL = baseUrl+"userBillingData";  // login url http://localhost:3000/userBillingData
  userMenu:any=[];
  userPassword:any;
  userEmail:any;
  menuData:any;
  tabKey:any=[];
  tabKeyValue:any=[];
  userPrivilege: any;
  fileName:any;
  time = new Date();
  currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
  fileLocation = this.currentDateTime;
  userLocation: any;
  allMenuListReq(){
    const postData={
      sessionId:"sessionid",
      userPassword:this.userPassword,
      userEmail:this.userEmail,
      userMenu:this.userMenu,
      userPrivilege:this.userPrivilege,
      userLocation:this.userLocation,
    }
    console.log("this.userPrivilege >>",postData);
    // post method to nodejs
    this.http.post(this.menuURL,postData).toPromise().then((menuData:any) =>{
      console.log(menuData); // response result
      this.menuData=menuData;
      this.menuData.forEach((element:any) => {
        this.tabKey=Object.keys(element);
        this.tabKeyValue.push((Object.values(element)));
      });
      console.log(this.tabKey);
      console.log(this.tabKeyValue);  
    });
  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('dtBasicExample');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    this.fileName=this.fileLocation+'.xlsx';
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }


  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router,public datepipe: DatePipe ) {
        this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
	}
	logOut(){
		
  this.router.navigate(['']);
  localStorage.clear();
	
	}
  
  ngOnInit() : void{
    this.userMenu = localStorage.getItem('userMenu');
    this.userPassword = localStorage.getItem('userPassword');
    this.userEmail = localStorage.getItem('userEmail');
    this.userPrivilege = localStorage.getItem('userPrivilege');
    this.userLocation = localStorage.getItem('userLocation');
    console.log("w32332")
    console.log(this.userLocation);
    console.log("w32332")
    this.allMenuListReq();
    
  }
  
}
