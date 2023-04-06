import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-forgot',
  templateUrl: './client-forgot.component.html',
  styleUrls: ['./client-forgot.component.scss']
})
export class ClientForgotComponent implements OnInit {

  
  public forgotSpinner: boolean = false;
  public submitted: boolean = false;

  constructor(public global :GlobalService,private route: Router, private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  }
  
  userforgot = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required, Validators.email 
    ])),
  })

   // convenience getter for easy access to form fields
   get f() { return this.userforgot.controls; }

   onforgot(){
    this.submitted = true;
    let userdetail = this.userforgot;
    if(userdetail.valid){
      this.forgotSpinner = true;
      var detail ={
        email:userdetail.value.email,
        role:'3'
      };
      var url = 'superadmin/webservices/api/forgot_password';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.forgotSpinner = false;
          $('#forgot_button').trigger('click');
        } else{
          this.global.dangerAlert(response.message);
          this.forgotSpinner = false;
        }
      }))
    } else{
    //  this.global.dangerAlert('Something Went Wrong');
      this.forgotSpinner = false;
      return false;
    }
  }

  ngOnInit(): void {
  }


}
