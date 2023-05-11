import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthTokenService } from 'src/app/service/auth-token.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportForm !: FormGroup

  constructor(private fb : FormBuilder , private auth : AuthTokenService) {

    this.supportForm = this.fb.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]

    })

   }

  ngOnInit(): void {
  }

  sendMessage(){
    let user = this.auth.getSellerId()
    let data =this.supportForm.value
    console.log(user);
    if(user.role === 'user'){
      data.userId = user.id
      this.auth.contactus(data).subscribe(res=>{
        if(res){
          alert("Message sent")
        }
      })

    }else{
      data.sellerId = user.id
      this.auth.contactus(data).subscribe(res=>{
        if(res){
          alert("Message sent")
        }
      })
    }



  }


}
