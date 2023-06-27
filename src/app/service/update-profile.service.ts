import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  // public url = 'http://localhost:3838'
  public url = 'https://ecombackend.softprodigyphp.in'


  constructor(private http:HttpClient) { }


  updateUserDetails(userId:any ,data:any){
    console.log(userId);
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put(`${this.url}/updateProfile/user/${userId}` , data , {headers} )

  }


  updateSellerDetails(sellerId:any , data:any){
  console.log(sellerId);
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put(`${this.url}/updateProfile/seller/${sellerId}` , data , {headers} )

  }



  changePassword(userId: string | null, sellerId: string | null, data: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  
    let url = `${this.url}/updateProfile/changePassword`;
    if (userId) {
      url += `/${userId}`;
    } else if (sellerId) {
      url += `/seller/${sellerId}`;
    }
  
    return this.http.put(url, data, { headers });
  }

}
