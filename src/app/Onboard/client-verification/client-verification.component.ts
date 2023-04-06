import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-verification',
  templateUrl: './client-verification.component.html',
  styleUrls: ['./client-verification.component.scss']
})
export class ClientVerificationComponent implements OnInit {

  public verifyMessage: any;
  public verifySpinner: boolean = false;
  public submitted: boolean = false;
  public userDetail : any =[];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.userDetail = JSON.parse(localStorage.getItem('sw_UserID'));
   }

  ngOnInit() {
  }
  userVerify = new FormGroup({
    otpcode: new FormControl('',Validators.compose([
      Validators.required])),
  })

   // convenience getter for easy access to form fields
   get f() { return this.userVerify.controls; }

  otpVerification(){
    this.submitted = true;
    let userdetail = this.userVerify;
    if(userdetail.valid){
      this.verifySpinner = true;
      var  detail={ "userid":this.userDetail,	"otp":userdetail.value.otpcode   }
      var url = 'superadmin/webservices/api/verify_otp';
      this.commonservice.PostApi(detail,url).subscribe((response : any) =>{
      if(response.status == 1){
        this.verifySpinner = false;
        var userSubject = response.data;
        this.verifyMessage = response.message; 
        localStorage.setItem('sw_loginDetail',<any> JSON.stringify(response.data));
        // this.commonservice.setSubject1(response.data);

        if(response.data.address){
          if(response.data.isPurchased == 1){
            this.route.navigate(['/studio']);
          }else{
            this.route.navigate(['/home']);
          }
        } else{
          this.route.navigate(['/Profile']);
        }
         //$('#sucess_btn').trigger('click'); 
         this.global.successAlert(response.message);

      }
      else{
        this.verifySpinner = false;
        this.verifyMessage = response.message; 
        this.global.dangerAlert(response.message);

      }
    })
   } else{
     //this.global.dangerAlert('Something Went Wrong');
     this.verifySpinner = false;
      return false;
    }
  }

  resendOtp(){
    var url = 'superadmin/webservices/api/resend_otp';
    this.commonservice.GetApi(url).subscribe(((response : any)=>{
      if(response.status == 1){
        this.global.successAlert(response.message);
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
  }
}


