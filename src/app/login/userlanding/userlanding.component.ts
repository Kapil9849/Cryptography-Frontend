import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlanding',
  templateUrl: './userlanding.component.html',
  styleUrls: ['./userlanding.component.scss']
})
export class UserlandingComponent implements OnInit {

  constructor(private loginService:LoginService,private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFiles();
  }

  files:any[]=[];
  user_data:any={};
  accessable_files:string[]=[];

  getFiles()
  {
    var user=localStorage.getItem("user")
    if(user!=undefined && user!=null)
    {
      var user_data=JSON.parse(user);
      this.user_data=user_data;
      this.loginService.getFile(user_data.role).subscribe((response:any)=>{
        console.log(response);
        (response.data).forEach((file:string)=>{
          this.files.push({"file_name":file,"has_access":false})
        });
        this.getAccessInfo();
      })
    }
  }

  getAccessInfo()
  {
    this.loginService.getAccessInfo(this.user_data.id).subscribe((response:any)=>{
      if(response.result)
      {
        this.accessable_files=response.files;
        console.log(this.accessable_files)
        this.files.forEach((file_data:any)=>{
          if(this.accessable_files.includes(file_data.file_name))
          {
            file_data.has_access=true;
          }
        })
      }
      console.log(this.files)
    })
  }

  RequestAccess(file_name:string)
  {
    console.log(file_name)
    var data={
      "user_id":this.user_data.id,
      "file_name":file_name
    }
    this.loginService.requestAccess(data).subscribe((response:any)=>{
      console.log(response)
      if(response.result)
      {
        this.showToast("success",response.message)
      }
      else{
        this.showToast("warn",response.message)
      }
    })
  }

  ViewFile(file_name:string)
  {
    console.log(file_name)
    var data={
      "user_id":this.user_data.id,
      "file_name":file_name
    }
    this.router.navigateByUrl("viewfile/"+file_name)
  }

  showToast(type:string,Message:string)
  {
    if(type=="success")
    {
    this.messageService.add({severity:'success', summary: 'Success', detail: Message});
    }
    else
    {
    this.messageService.add({severity:'warn', summary: 'Warning', detail: Message});
    }
  }

}
