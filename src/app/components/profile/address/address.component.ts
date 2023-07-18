import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  shipDetails!: FormGroup;
  showSpinner: boolean = false;
  Myaddress: any = [];
  editmode: boolean = false;
  addressId: any;
  constructor(private fb: FormBuilder, private address: AddressService) {}

  ngOnInit(): void {
    this.shipDetails = this.fb.group({
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: [
        '',
        [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')],
      ],
      country: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
    });

    this.getAddress();
  }

  getAddress() {
    // this.showSpinner = true
    this.address.getAddresses().subscribe((res) => {
      const data = res as any;
      this.Myaddress = data.addresses;
      // this.showSpinner = false
    });
  }

  submitDetails() {
    this.showSpinner = true;
    let data = this.shipDetails.value;

    this.address.addAddress(data).subscribe((res) => {
      if (res) {
        this.shipDetails.reset();
        this.getAddress();
        this.showSpinner = false;
      }
    });
  }

  editAddress(item: any) {
    this.addressId = item._id;
    this.shipDetails.setValue({
      fullName: item.fullName,
      addressLine1: item.addressLine1,
      addressLine2: item.addressLine2,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      country: item.country,
      phone: item.phone,
    });
    this.editmode = true;
  }

  updateDeatials() {
    this.showSpinner = true;
    const id = this.addressId;
    let data = this.shipDetails.value;
    this.address.updateAddress(id, data).subscribe((res) => {
      if (res) {
        console.log(res);
        this.getAddress();
        this.shipDetails.reset();
        this.editmode = false;
        this.showSpinner = false;
      }
    });
  }

  deleteAddress(id: any) {
    this.showSpinner = true;
    this.address.deleteAddress(id).subscribe((res) => {
      if (res) {
        this.getAddress();
        this.showSpinner = false;
      }
    });
  }
}
