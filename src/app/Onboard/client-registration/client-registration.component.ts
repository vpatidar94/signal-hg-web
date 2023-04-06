import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {
  public registerSpinner: boolean = false;
  public submitted: boolean = false;
  public Usertype : any = 'me';
  public userCheck : any;
  public registerData : any =[];  
  public CountryList : any =[];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    if(localStorage.getItem('sw_clientregistration')){
      this.registerData = JSON.parse(localStorage.getItem('sw_clientregistration')); 
      this.Usertype = this.registerData.singup_for;
    } 
  }
  
  userregister = new FormGroup({
    name: new FormControl('',Validators.compose([
      Validators.required])),
    lastname: new FormControl('',Validators.compose([
        Validators.required])),
    mobile: new FormControl('',Validators.compose([
        Validators.required,Validators.pattern('^[1-9][0-9]{8,200}')])),
    email: new FormControl('',Validators.compose([
      Validators.required, Validators.email 
    ])),
    country_code:new FormControl('',Validators.compose([
      Validators.required])),
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')
    ]))
  })

   // convenience getter for easy access to form fields
   get f() { return this.userregister.controls; }

  onregister(){
    this.submitted = true;
    let userdetail = this.userregister;
    if(userdetail.valid){
      this.registerSpinner = true;
      userdetail.value.singup_for = this.Usertype;
      var detail = { "email":userdetail.value.email,  "mobile":userdetail.value.mobile};
      var url = 'superadmin/webservices/api/validate';
      this.commonservice.PostApis(detail,url).subscribe (((response : any) => {
        if(response.status == 1){
          localStorage.setItem('sw_clientregistration', <any>JSON.stringify(userdetail.value));   
          this.route.navigate(['/otherdetail'],{ state: { registerDeatil:  userdetail.value}})   ;
          this.registerSpinner = false;
        } else{
          this.global.dangerAlert(response.message);
          this.registerSpinner = false;
        }
      }))
      //userdetail.value.singup_for = this.Usertype;
    

   } else{
     //this.global.dangerAlert('Something Went Wrong');
      this.registerSpinner = false;
      return false;
    }
  }

  ngOnInit(): void {
    this.getCountry();
  }


  showHide(){
      var input = $($('.toggle-password').attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
  }

  getUserType(event){
    this.Usertype = event.target.value;
  }

  getCountry (){
    var cd , url = 'superadmin/webservices/api/get_countries';
    this.commonservice.GetApi(url).subscribe((response : any) =>{      
      if(response.status == 1){
       response.data.filter(function(el){
         if(el.name== 'United States'){
         cd =  el.name +' ('+el.code+')' ;
         }
       })
       this.CountryList = response.data;
       this.registerData.country_code = cd;
       }
    })
  }


}

