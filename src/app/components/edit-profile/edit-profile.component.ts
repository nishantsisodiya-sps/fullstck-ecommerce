import { Component, OnInit } from '@angular/core';
import { ForgetPasswordService } from 'src/app/service/forget-password.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  email : any = ''


  constructor(private forgetPass : ForgetPasswordService) { }

  ngOnInit(): void {
    
  }


  sendMail(){
    this.forgetPass.sendLinkToMail(this.email).subscribe(res=>{
      console.log(res);
    })
  }

}
