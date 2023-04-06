import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-other-detail',
  templateUrl: './client-other-detail.component.html',
  styleUrls: ['./client-other-detail.component.scss']
})
export class ClientOtherDetailComponent implements OnInit {

  public registerData: any;
  public otherData : any =[];
  public registerMessage: any;
  public register1Spinner: boolean = false;
  public submitted: boolean = false;
  public lattitude: any;
  public longitude: any;
  public gender : any = 'male';
  public location_name: any;
  public zipcode: any; 
  public street: any;
  public startDate : any;
  public CountryList : any =[];
  maxDate: Date;
  

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate); 
    if(this.route.getCurrentNavigation() == null || this.route.getCurrentNavigation().extras.state == undefined) {
      if(localStorage.getItem('sw_clientregistration')){
        this.registerData = JSON.parse(localStorage.getItem('sw_clientregistration')); 
      } 
    } else {
        this.registerData =  this.route.getCurrentNavigation().extras.state.registerDeatil; }
    if(localStorage.getItem('sw_clientOther')){
      this.otherData = JSON.parse(localStorage.getItem('sw_clientOther')); 
      this.gender = this.otherData.gender;
    } 
  }

  userregister1 = new FormGroup({
    address: new FormControl('',Validators.compose([
      Validators.required])),
    city: new FormControl('',Validators.compose([
      Validators.required])),
    state: new FormControl('',Validators.compose([
      Validators.required])),
    country: new FormControl('',Validators.compose([
      Validators.required])),
    street: new FormControl(''),
    date_of_birth: new FormControl('',Validators.compose([
      Validators.required])), 
    referred_by:new FormControl(''),
    emergency_contact_no:new FormControl('',Validators.compose([
      Validators.required,Validators.pattern('^[1-9][0-9]{8,200}')])),
    emergency_country_code:new FormControl('',Validators.compose([
      Validators.required])), 
    emergency_contact_person:new FormControl('',Validators.compose([
      Validators.required])),
           
  })

   // convenience getter for easy access to form fields
   get f() { return this.userregister1.controls; }

  onregister1(){
    var s=this.registerData.country_code.split('(');
    var register_courtycode= s[1].split(')');
    //this.registerData.country_code=s1[0];

    var s=this.userregister1.value.emergency_country_code.split('(');
    var emergency_courtycode= s[1].split(')');
    //this.userregister1.value.emergency_country_code=s1[0];

    if(this.otherData.date_of_birth){
      this.userregister1.value.date_of_birth = this.global.ToDate(this.otherData.date_of_birth);     
    }

    this.submitted = true;
    let userdetail = this.userregister1;
    if(userdetail.valid){
      this.register1Spinner = true;   
      userdetail.value.gender = this.gender;  
      var formData = new FormData();
      formData.append('email',this.registerData.email);
      formData.append('mobile',this.registerData.mobile);
      formData.append('password',this.registerData.password);
      formData.append('name',this.registerData.name);
      formData.append('lastname',this.registerData.lastname)   ;    

      formData.append('gender',userdetail.value.gender);
      formData.append('date_of_birth',userdetail.value.date_of_birth);
      formData.append('address',userdetail.value.address);
      formData.append('city',userdetail.value.city);
      formData.append('state',userdetail.value.state);
      formData.append('country',userdetail.value.country);
      formData.append('about','');
      formData.append('zipcode',this.zipcode);

      formData.append('lat',this.lattitude);
      formData.append('lang',this.longitude);
      formData.append('street',userdetail.value.street);

      formData.append('role','3');
      formData.append('image','');
      formData.append('device_type','');
      formData.append('device_token','');
      formData.append('country_code',register_courtycode[0]);
      formData.append('referred_by',userdetail.value.referred_by);
      formData.append('emergency_contact_person',userdetail.value.emergency_contact_person);
      formData.append('emergency_country_code',emergency_courtycode[0]);
      formData.append('emergency_contact_no',userdetail.value.emergency_contact_no);
      formData.append('singup_for', this.registerData.singup_for);
      var url = 'superadmin/webservices/api/register';
      this.commonservice.PostApis(formData,url).subscribe((response : any) =>{
      if(response.status == 1){
        this.register1Spinner = false;
        localStorage.setItem('sw_UserID',<any> JSON.stringify(response.data.id));

        //localStorage.setItem('sw_loginDetail', <any>JSON.stringify(response.data));
        var userSubject = response.data;
        // this.commonservice.sendData(userSubject);
        this.registerMessage = response.message; 
        // $('#registersuccessModal_btn').trigger('click'); 
       // this.route.navigate(['/verification']);
       this.route.navigate(['/signin']);

        localStorage.removeItem('sw_clientOther');
        localStorage.removeItem('sw_clientregistration');
        this.global.successAlert(response.message);
      }
      else{
        localStorage.setItem('sw_clientOther', <any>JSON.stringify(userdetail.value));
        this.register1Spinner = false;
        this.registerMessage = response.message; 
        this.global.dangerAlert(response.message);

        // $('#registererrorModal_btn').trigger('click'); 
      }
    })
    } else{
   //  this.global.dangerAlert('Something Went Wrong');
      this.register1Spinner = false;
      return false;
    }
  }

  ngOnInit(): void {
    this.getCountry();
  }
  /*
  * Google address autocomplete
  * @return address, lat, long
 */
handleAddressChange(address: any) {
    this.lattitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.otherData.address = address.formatted_address;
    // this.userregister1.value.location_name = address.name;
    this.otherData.street = address.name;
    for(var i = 0; i < address.address_components.length; i++){
      var state = address.address_components[i].types[0];
      if(state == "administrative_area_level_1"){
        this.otherData.state = address.address_components[i].long_name;
        // this.userregister1.value.state = address.address_components[i].long_name;
      }
      var city = address.address_components[i].types[0];
      if(city == "administrative_area_level_2"){
        // this.userregister1.value.city = address.address_components[i].long_name;
        this.otherData.city = address.address_components[i].long_name;
      }
      var country = address.address_components[i].types[0];
      if(country == "country"){
        // this.userregister1.value.country = address.address_components[i].long_name;
        this.otherData.country = address.address_components[i].long_name; 
      }
      var postal_code =  address.address_components[i].types[0];
      if(postal_code == "postal_code"){
        this.zipcode = address.address_components[i].long_name; 
      }
    }
}

getGender(event){
  this.gender = event.target.value;
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
     this.otherData.emergency_country_code = cd;
     }
  })
}

currentDetail(){
  this.userregister1.value.gender = this.gender;
  localStorage.setItem('sw_clientOther', <any>JSON.stringify(this.userregister1.value));
  this.route.navigate(['/registration']);
}
}
