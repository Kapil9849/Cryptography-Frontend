import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private router:Router)
  {

  }
  ngOnInit(){
    this.checkLogin();
  }
  title = 'CryptoFrontend';
  LoggedIn:boolean=false;
  username:string="";
  isuser:boolean=false;
  isadmin:boolean=false;

  Logout()
  {
    localStorage.clear();
    this.router.navigateByUrl("/login").then(()=>{
      location.reload();
    })
  }

  checkLogin()
  {
    this.isuser=false;
    this.isadmin=false;
    var user=localStorage.getItem("user")
    if(user!=undefined && user!=null)
    {
      this.LoggedIn=true;
      var user_data=JSON.parse(user);
      this.username= user_data.first_name+" "+user_data.last_name;
      console.log(user_data)
      if(user_data.role==="Administrator")
      this.isadmin=true;
      else
      this.isuser=true;
    }
    else
    {
      this.LoggedIn=false;
    }
  }
}
