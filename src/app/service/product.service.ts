import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public url  = 'http://localhost:3838'
  constructor(private http : HttpClient) { }


        // <<<<<<<<<<<<<<<<<<<<<<<<<< Products routes >>>>>>>>>>>>>>>>>>>>>>>>>>>


    // =========================== to delete single product===========================

    deleteProduct(id : any):Observable<any>{

      const headers = new HttpHeaders({
       
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.delete(`${this.url}/products/${id}` , {headers})
  
    }

    // =========================== to search products ===========================


    searchProducts(query : any):Observable<any>{
      return this.http.get(`${this.url}/products/search?title=${query}`)
    }



        // <<<<<<<<<<<<<<<<<<<<<<<<<< Cart routes >>>>>>>>>>>>>>>>>>>>>>>>>>>



  // =========================== to add product to the cart ===========================


  addToCart(data:any) : Observable < any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

   return this.http.post(`${this.url}/cart/add` , data , {headers})
  }




  // =========================== to get the cart length ===========================


  getCartValue(id:any) : Observable <any>{                    

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/cart/${id}` ,{headers})
  }


  


    // =========================== to get the cart items ===========================


  getCartItems(id : any){
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(`${this.url}/cart/${id}` , {headers})
  }


    // =========================== to update the cart quantities ===========================

  updateCartItem(itemId : any , quantity:number):Observable<any>{

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.url}/cart/${itemId}` , { quantity } , {headers})
  }


  // =========================== to get the cart length ===========================

  deleteFromCart(itemId : any):Observable<any>{
    const headers = new HttpHeaders({
     
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete<any>(`${this.url}/cart/${itemId}` , {headers})
  }



}
