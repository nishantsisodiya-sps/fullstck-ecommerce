import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  public url = 'http://localhost:3838/updateProfile'

  constructor(private http:HttpClient) { }


  sendLinkToMail(email:any):Observable<any>{
    console.log('email===>' , email);
    return this.http.post(`${this.url}/reset-password/email` , {email : email})
  }

}
