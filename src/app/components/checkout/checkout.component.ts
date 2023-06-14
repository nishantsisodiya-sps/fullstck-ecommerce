import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthTokenService } from 'src/app/service/auth-token.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AddressService } from 'src/app/service/address.service';

declare var Razorpay: any



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  // standalone: true,
})


export class CheckoutComponent implements OnInit {
  isLinear = false;
  totalPrice: any;
  cartData: any
  products: any = []
  cartProduct: any
  showSpinner: boolean = false
  addresses: any = []
  selectedId: any
  selectedAddress: any = []
  redirect_url: any



  shipDetails = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    street: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    state: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    zip: new FormControl(null, [Validators.required, Validators.pattern(/^([1-9])(\d{2})(\d{3})$/)])
  });

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  // public url = 'https://ecombackend.softprodigyphp.in'
  public url = 'http://localhost:3838'

  constructor(private activate: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthTokenService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private address: AddressService
  ) { }

  ngOnInit(): void {
    this.getAddress()
    this.activate.queryParams.subscribe(params => {
      this.totalPrice = params['totalPrice'];
      this.cartProduct = JSON.parse(params['queryProduct']);

    });
  }


  purchase() {
    if (this.selectedAddress) {

      let userId = this.auth.getSellerId().id;
      let address = this.selectedAddress[0].addressLine1 + ', ' + this.selectedAddress[0].addressLine2 + ', ' + this.selectedAddress[0].city + ' , ' + this.selectedAddress[0].state + ' , ' + this.selectedAddress[0].country + ' - ' + this.selectedAddress[0].postalCode + ' , ' + this.selectedAddress[0].phone;
      let name = this.selectedAddress[0].fullName
      this.showSpinner = true;

      const headers = new HttpHeaders({

        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });

      this.http.post(`${this.url}/order/create-order`, { name: name, amount: this.totalPrice, userId: userId, address: address, products: this.cartProduct, testMode: true }, { headers }).subscribe((data: any) => {
        console.log('myData' , data);
        this.showSpinner = false;
        if (data && data.orderId) {
          this.openRazorpay(data.razorpayOrderId);
        }
      });
    } else {
      alert('please add address')
    }

  }

  openRazorpay(razorpayOrderId: any) {
    const razorpay = new Razorpay({
      key: 'rzp_test_Tiv5oHxAC3kTlH',
      name: 'Apna market',
      description: 'Purchase description',
      currency: 'INR',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      order_id: razorpayOrderId.id,
      handler: (response: any) => {
        console.log(response)
        console.log(response.razorpay_payment_id)
        // Callback function for successful payment
        this.saveOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: this.selectedAddress[0].fullName,
        email: '',
        contact: this.selectedAddress[0].phone,
      },
      notes: {
        address: this.selectedAddress[0].addressLine1 + ', ' + this.selectedAddress[0].addressLine2 + ', ' + this.selectedAddress[0].city + ' , ' + this.selectedAddress[0].state + ' , ' + this.selectedAddress[0].country + ' - ' + this.selectedAddress[0].postalCode + ' , ' + this.selectedAddress[0].phone
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
    const order = {
      userId: userId,
      address: this.selectedAddress[0].addressLine1 + ', ' + this.selectedAddress[0].addressLine2 + ', ' + this.selectedAddress[0].city + ' , ' + this.selectedAddress[0].state + ' , ' + this.selectedAddress[0].country + ' - ' + this.selectedAddress[0].postalCode + ' , ' + this.selectedAddress[0].phone,
      totalAmount: this.totalPrice,
      status: 'pending',
      paymentId: paymentId,
      testMode: true
    };

    // Call your backend API to save the order in your database

    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    this.http.post(`${this.url}/order/update-order`, order, { headers }).subscribe((response: any) => {
      console.log('response order save====>', response);
      this.showSpinner = false;

      //Redirecting to home after successfull payment

      if (response.orderId == null) {
        console.log('if');
        this.redirect_url = '/cart';
      } else {
        console.log('else');
        this.redirect_url = '/home';
      }
      location.href = this.redirect_url;
    }
    )
  }


  getAddress() {
    this.address.getAddresses().subscribe(res => {
      this.addresses = res['addresses']
    })
  }

  

  selectAddress(id: any) {
    const radioBtn = document.getElementById(id) as HTMLInputElement;
    if (radioBtn) {
      radioBtn.checked = true;
    }
    this.selectedId = id;
    this.selectedAddress = [];
  
    this.address.getSingleAddress(this.selectedId).subscribe(res => {
      this.selectedAddress.push(res.address);
      console.log(this.selectedAddress);
    });
  }

}


