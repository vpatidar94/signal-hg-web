import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-forgot',
  templateUrl: './staff-forgot.component.html',
  styleUrls: ['./staff-forgot.component.scss']
})
export class StaffForgotComponent implements OnInit {

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
        role:'4'
      };
      var url = 'superadmin/webservices/api/forgot_password';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{        if(response.status == 1){
          this.forgotSpinner = false;
          $('#forgot_button').trigger('click');
          //this.global.successAlert(response.message);
        } else{
          this.global.dangerAlert(response.message);
          this.forgotSpinner = false;
        }
      }))
     

   } else{
     //this.global.dangerAlert('Something Went Wrong');
      this.forgotSpinner = false;
      return false;
    }
  }

  ngOnInit(): void {
  }


}
