import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-adminlanding',
  templateUrl: './adminlanding.component.html',
  styleUrls: ['./adminlanding.component.scss']
})
export class AdminlandingComponent implements OnInit {

  constructor(private loginService:LoginService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAccessInfo()
    this.getUserData()
  }
  user_data:any={};
  users:any[]=[];
  selectedUser:any=0;
  userAccessData:any[]=[];
  table_data:any=[]
  revoke_data:any=[]

  getAccessInfo()
  {
    var user=localStorage.getItem("user")
    if(user!=undefined && user!=null)
    {
      var user_data=JSON.parse(user);
      this.user_data=user_data;

      this.loginService.getAllAccessInfo().subscribe((respomse:any)=>{
        console.log(respomse)
        this.userAccessData=respomse.files
      })
    }
  }

  getUserData()
  {
    this.loginService.getAllUsers().subscribe((respomse:any)=>{
      this.users=respomse
      console.log(this.users)
      this.users.pop()
    })
  }

  UserSelected()
  {
    console.log(this.selectedUser)
    this.table_data=[];
    this.userAccessData.forEach((user:any)=>{
      console.log(user)
      if(user.user_id==this.selectedUser)
      {
        console.log("matched",user)
        this.table_data=user.requests;
      }
    })
  }

  ApproveAccess(file_name:string)
  {
    console.log(file_name)
    console.log(this.selectedUser)
    var data={
      "user_id": this.selectedUser,
      "file_name": file_name
    }
    this.loginService.approveAccess(data).subscribe((response:any)=>{
      console.log(response)
      if(response.result)
      {
        this.getAccessInfo();
        setTimeout(() => {
          this.UserSelected();

        },100);
      }
    })
  }

  Reject(file_name:string)
  {
    var data={
      "user_id": this.selectedUser,
      "file_name": file_name
    }
    this.loginService.reject(data).subscribe((response:any)=>{
      console.log(response)
      if(response.result)
      {
        this.getAccessInfo();
        setTimeout(() => {
          this.UserSelected();

        },100);
      }
    })
  }

  UserSelectedForRevoke()
  {
    console.log("in revoke ", this.selectedUser);
    this.loginService.getAccessInfo(this.selectedUser).subscribe((response:any)=>{
      this.revoke_data=response.files
    })
  }

  RevokeAccess(file_name:string)
  {
    var data={
      "user_id": this.selectedUser,
      "file_name": file_name
    }
    this.loginService.revokeAccess(data).subscribe((response:any)=>{
      console.log(response)
      if(response.result)
      {
        this.showToast("success",response.message)
        setTimeout(() => {
          this.UserSelectedForRevoke();
        },100);
      }
      else{
        this.showToast("error",response.message)
      }
    })
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
