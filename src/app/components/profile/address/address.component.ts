import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  shipDetails !: FormGroup
  showSpinner: boolean = false


  constructor(private fb: FormBuilder , private address : AddressService) { }

  ngOnInit(): void {
    this.shipDetails = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
    });
  }


  submitDetails() {
    let data  = this.shipDetails.value
    console.log(data);

    this.address.addAddress(data).subscribe(res=>{
      console.log(res);
    })    

  }

}
