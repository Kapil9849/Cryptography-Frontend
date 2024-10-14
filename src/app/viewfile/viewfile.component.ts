import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-viewfile',
  templateUrl: './viewfile.component.html',
  styleUrls: ['./viewfile.component.scss']
})
export class ViewfileComponent implements OnInit {

  constructor(private loginService:LoginService,private route: ActivatedRoute,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.viewDecryptedFile();
  }

  file_data:any[]=[]
  user_data:any={};
  file_name:string="";
  cipher_text:string="";

  viewDecryptedFile()
  {
    var user=localStorage.getItem("user")
    if(user!=undefined && user!=null)
    {
      var user_data=JSON.parse(user);
      this.user_data=user_data;
    }
    this.route.params.subscribe(params => {
      this.file_name = params['file_name'];
      var data={
        "user_id":this.user_data.id,
        "file_name":this.file_name
      }
      console.log(data)
      this.loginService.getDecryptedFile(data).subscribe((response:any)=>{
        console.log(response)
        if(response.result=="False")
        {
          this.showToast("warn",response.message);
        }
        else{
          this.cipher_text=response.cipher_text;
          (response.message).forEach((data:any)=>{
            if(data!="")
            {
              this.file_data.push(data)
            }
          })
        }
      })
    });
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
