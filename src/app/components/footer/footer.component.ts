import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthTokenService } from 'src/app/service/auth-token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  email : any
  emailFormControl!: FormControl;
  show : boolean = false
  isAdmin : boolean = false
  constructor(private support : AuthTokenService) { 
    
  }

  ngOnInit(): void {
    this.emailFormControl = new FormControl('', [
      Validators.email
    ]);

    let role = this.support.getSellerId().role


    if(role === 'superAdmin'){
      this.isAdmin = true
    }else{
      this.isAdmin = false
    }

  }


  subscribeMe(){
    let email = this.email
    let reg = new RegExp(/^[^@]+@[^@]+\.[^@\.]{2,}$/)
    let result = reg.test(email)
    if(result == true){
      this.support.subscribeUser(this.email).subscribe(res=>{
    })

    }else{
      this.show = true
    }
   

  }

}