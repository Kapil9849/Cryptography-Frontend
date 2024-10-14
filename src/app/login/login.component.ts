import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(private loginService:LoginService,private router:Router) {}

  loginModel:any={
    username:"",
    password:""
  }
  login_message="";
  invalid_form:boolean=false;

  Login()
  {
    this.login_message="";
    this.invalid_form=false;
    console.log(this.loginModel);
    if(this.loginModel.username=="" || this.loginModel.password=="")
    {
      this.login_message="Please fill the credentials";
      this.invalid_form=true;
    }
    else{
      this.loginService.Login(this.loginModel).subscribe((response:any)=>{
        if(response.result && response.data.role==="Administrator"){
          console.log("Admin Loginn")
          this.router.navigateByUrl("/adminlanding").then(()=>{location.reload()});
          localStorage.setItem("user",JSON.stringify(response.data));
        }
        else if(response.result && response.data.role!="Administrator" )
        {
          this.router.navigateByUrl("/userlanding").then(()=>{location.reload()});
          localStorage.setItem("user",JSON.stringify(response.data));
        }
        else{
          this.login_message=response.message;
          this.invalid_form=true;
        }
      })
    }
  }
}

