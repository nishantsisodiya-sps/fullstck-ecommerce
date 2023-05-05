import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthTokenService } from 'src/app/service/auth-token.service';


declare var Razorpay : any

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: any;
  cartData: any


  showSpinner : boolean = false

    shipDetails = new FormGroup({
    firstName :   new FormControl(null, [Validators.required]),
    lastName :   new FormControl(null, [Validators.required]),
    street :   new FormControl(null, [Validators.required]),
    city :   new FormControl(null, [Validators.required]),
    state :   new FormControl(null, [Validators.required]),
    email :   new FormControl(null, [Validators.required]),
    zip :   new FormControl(null, [Validators.required]),
  });

  constructor(private activate : ActivatedRoute , private http : HttpClient , 
    private auth : AuthTokenService ,
    ) { }

  ngOnInit(): void {

    this.activate.queryParams.subscribe(params=>{
      this.totalPrice = params['totalPrice']
    })

  }

  purchase() {
    let userId =  this.auth.getSellerId().id;
    let address = this.shipDetails.get('street')?.value + ', ' + this.shipDetails.get('city')?.value + ', ' + this.shipDetails.get('state')?.value + ' - ' + this.shipDetails.get('zip')?.value;

    this.showSpinner = true;
    this.http.post('http://localhost:2800/order/create-order', { amount: this.totalPrice , userId : userId , address : address, testMode: true }).subscribe((data: any) => {
      console.log(data);
      this.showSpinner = false;
      if (data && data.orderId) {
        console.log(data.razorpayOrderId.id);
        this.openRazorpay(data.razorpayOrderId);
      }
    });
  }
  
  openRazorpay(razorpayOrderId : any) {
    const razorpay = new Razorpay({
      key: 'rzp_test_Tiv5oHxAC3kTlH',
      name: 'My Online Store',
      description: 'Purchase description',
      currency: 'INR',
      image: 'https://example.com/your_logo.jpg',
      order_id: razorpayOrderId.id,
      handler: (response: any) => {
        // Callback function for successful payment
        console.log('responst====>' + response);
        this.saveOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: this.shipDetails.get('firstname')?.value + ' ' + this.shipDetails.get('lastname')?.value,
        email: this.shipDetails.get('email')?.value,
        contact: '',
      },
      notes: {
        address: this.shipDetails.get('street')?.value + ', ' + this.shipDetails.get('city')?.value + ', ' + this.shipDetails.get('state')?.value + ' - ' + this.shipDetails.get('zip')?.value
      },
      theme: {
        color: '#F37254'
      }
    });

    razorpay.open();
  }
  
  saveOrder(paymentId: string) {
    this.showSpinner = true;
    let userId = this.auth.getSellerId().id;
    console.log('userId======>', userId);
    const order = {
      userId: userId,
      address: this.shipDetails.get('street')?.value + ', ' + this.shipDetails.get('city')?.value + ', ' + this.shipDetails.get('state')?.value + ' - ' + this.shipDetails.get('zip')?.value,
      totalAmount: this.totalPrice,
      status: 'pending',
      paymentId: paymentId,
      testMode: true // set test mode flag to true
    };
  
    // Call your backend API to save the order in your database
    this.http.post('http://localhost:2800/order/update-order', order).subscribe((response: any) => {
      console.log('response order save====>', response);
      this.showSpinner = false;
    });
  }
  


}


