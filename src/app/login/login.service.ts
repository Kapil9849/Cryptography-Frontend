import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  base_api:string="http://192.168.140.129:8000"

  Login(loginModel:any):Observable<any>
  {
    return this.http.post(this.base_api+"/login",loginModel)
  }

  getFile(role:string):Observable<any>
  {
    return this.http.get(this.base_api+"/getfiles/"+role);
  }

  getAccessInfo(user_id:number):Observable<any>
  {
    return this.http.get(this.base_api+"/accessinfo?user_id="+user_id)
  }

  requestAccess(data:any):Observable<any>
  {
    return this.http.post(this.base_api+"/requestaccess",data);
  }

  getAllAccessInfo():Observable<any>
  {
    return this.http.get(this.base_api+"/allaccessinfo")
  }

  getAllUsers():Observable<any>
  {
    return this.http.get(this.base_api+"/users");
  }

  getDecryptedFile(data:any):Observable<any>
  {
    return this.http.post(this.base_api+"/getfile",data);
  }

  approveAccess(data:any)
  {
    return this.http.post(this.base_api+"/giveaccess",data);
  }

  reject(data:any)
  {
    return this.http.post(this.base_api+"/reject",data);
  }

  revokeAccess(data:any)
  {
    return this.http.post(this.base_api+"/removeAccess",data);
  }
}
