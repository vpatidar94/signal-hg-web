import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-registration',
  templateUrl: './staff-registration.component.html',
  styleUrls: ['./staff-registration.component.scss']
})
export class StaffRegistrationComponent implements OnInit {

  public registerSpinner: boolean = false;
  public submitted: boolean = false;
  public registerData : any =[];
  public CountryList : any =[];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    if(localStorage.getItem('sw_staffregistration')){
      this.registerData = JSON.parse(localStorage.getItem('sw_staffregistration')); 
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
      var detail = { "email":userdetail.value.email,  "mobile":userdetail.value.mobile};
      var url = 'superadmin/webservices/api/validate';
      this.commonservice.PostApis(detail,url).subscribe (((response : any) => {
        if(response.status == 1){
        localStorage.setItem('sw_staffregistration', <any>JSON.stringify(userdetail.value));   
        this.route.navigate(['/staff-otherdetail'],{ state: { registerDeatil:  userdetail.value}})   ;
        this.registerSpinner = false;
      } else{
        this.global.dangerAlert(response.message);
        this.registerSpinner = false;
      }
  }))

   } else{
    //  this.global.dangerAlert('Something Went Wrong');
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

    //change the coutry code & visible in tab
    getCode(obj){
      for(var i=0; i<this.CountryList.length; i++){
        if(this.CountryList[i].name == 'United States'){
          this.registerData.country_code = this.CountryList[i].code;
        }
      }
    }
}


