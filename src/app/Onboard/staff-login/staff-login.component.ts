import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss']
})
export class StaffLoginComponent implements OnInit {

  public loginSpinner: boolean = false;
  public submitted: boolean = false;
  public currentuserloggedin : any =[];
  public remembercheck : boolean = false ;
  public email : any ;
  public password : any;

  userlogin = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required, Validators.email 
    ])),
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')
    ]))
  })

  constructor(public global :GlobalService,private route: Router, private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.currentuserloggedin = JSON.parse(localStorage.getItem('sw_loginDetail'));
    if(localStorage.getItem('sw_Remember')){
      var data = JSON.parse(localStorage.getItem('sw_Remember'));
      this.email = data.email;
      this.password = data.password;
      this.remembercheck = data.check;
    }
  }
  

   // convenience getter for easy access to form fields
   get f() { return this.userlogin.controls; }

   onlogin(){
    this.submitted = true;
    let userdetail = this.userlogin;
    if(userdetail.valid){
      this.loginSpinner = true;
      var detail ={
        email:userdetail.value.email,
        password:userdetail.value.password,
        device_token:'',
        device_type:'Browser',
        role:'4'
      };
      var url = 'superadmin/webservices/api/login';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{
        if(response.status == 1){
          localStorage.setItem('sw_loginDetail',<any> JSON.stringify(response.data));
          localStorage.setItem('sw_parentId', <any>JSON.stringify(response.data.id));  

          if(this.remembercheck){
            var detail = {'email':this.userlogin.value.email,'password':this.userlogin.value.password,'check':this.remembercheck}
            localStorage.setItem('sw_Remember',<any> JSON.stringify(detail));
          } else {
            localStorage.removeItem('sw_Remember');
          }
          // this.commonservice.setSubject1(response.data);
          if(response.data.address){
          if(response.data.is_studio_added == 1){
            this.route.navigate(['/studio']);
          }else{
            this.route.navigate(['/home']);
          }          
        } else{
          this.route.navigate(['/my-Profile']);
        }
          this.global.successAlert(response.message);
          this.loginSpinner = false;
        } else{
          this.global.dangerAlert(response.message);
          // if(response.message =="Mobile otp not verified."){
          //   localStorage.setItem('sw_UserID',<any> JSON.stringify(response.data.id));
          //   this.route.navigate(['/staff-verification']);
          // }
          this.loginSpinner = false;
        }
      }))
     

   } else{
     //this.global.dangerAlert('Something Went Wrong');
      this.loginSpinner = false;
      return false;
    }
  }

  ngOnInit(): void {
    if(this.currentuserloggedin){
      this.route.navigate(["/home"]);
    } else {
      this.route.navigate(["/staff-signin"]);
    }
  }


  showHide(){
      var input = $($('.toggle-password').attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
  }

  getCheckType(event){
    this.remembercheck = event.target.checked;
  }
}

