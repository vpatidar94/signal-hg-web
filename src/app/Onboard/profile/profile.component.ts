import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../../Services/data.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileSpinner: boolean = false;
  public changepasswordSpinner: boolean = false;
  public ProfileDetail : any =[];
  public submitted: boolean = false;
  public Usertype : any = 'me';
  public gender : any ='male';
  public loading : boolean = true;
  public CountryList : any =[];
  public selected: boolean = false;
  public selectedFile: any;
  public userUpdatedImage: any; 
  public imagePath;
  imgURL: any;
  public message: string;
  maxDate: Date;
  public dob : any;
  public selectedIDs : any;
  public response_msg : any
  public ImageWidth: any;
  public ImageHeight: any;
  imageChangedEvent: any = '';
  public CurrentUrl : any ;
  public memberDetail : any = [];
  public userinfo : any = [];
  public parentDetail : any = [];


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate); 
    this.CurrentUrl = this.route.url;   
    this.userinfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.memberDetail = JSON.parse(localStorage.getItem('sw_MemberDetail'));
    this.parentDetail = JSON.parse(localStorage.getItem('sw_ParentDetail'));

   }
   
  ngOnInit(): void {
    this.getCountry();  
    this.getProfile();
    if(this.CurrentUrl == '/Profile'){
      $('#changepass').trigger('click');
    }
  }

  userpassword = new FormGroup({
    old_password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')
    ])),
    new_password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')
    ])),
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30) ,
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.])[A-Za-z\\d$@$!%*?&#.]{8,30}')
    ]))
  })

  userProfile = new FormGroup({
    name: new FormControl('',Validators.compose([
      Validators.required])),
    lastname: new FormControl('',Validators.compose([
      Validators.required])),
    email: new FormControl('',Validators.compose([
      Validators.required])),
    mobile1: new FormControl('',Validators.compose([
      Validators.required])),
    date_of_birth: new FormControl('',Validators.compose([
      Validators.required])),
    address: new FormControl('',Validators.compose([
      Validators.required])),
    city: new FormControl('',Validators.compose([
      Validators.required])),
    state: new FormControl('',Validators.compose([
      Validators.required])),
    country: new FormControl('',Validators.compose([
      Validators.required])),
    emergency_contact_person: new FormControl('',Validators.compose([
      Validators.required])),
    emergency_country_code: new FormControl('',Validators.compose([
      Validators.required ])),
    emergency_contact_no:new FormControl('',Validators.compose([
      Validators.required,Validators.pattern('^[1-9][0-9]{8,200}')])), 
  })

  showHide(){
    var input = $($('.toggle-password').attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }

 
   // convenience getter for easy access to form fields
   get pf() { return this.userpassword.controls; }

    // convenience getter for easy access to form fields
    get f() { return this.userProfile.controls; }

  changePassword(){   
    this.submitted = true;    
    let userdetail = this.userpassword;
    if(userdetail.value.new_password != userdetail.value.password){
     this.global.dangerAlert('Password not match');
      this.changepasswordSpinner = false;
      return false;
    }
    if(userdetail.valid){
      this.changepasswordSpinner = true;
      var  detail={ "old_password": userdetail.value.old_password,   "new_password": userdetail.value.new_password}
      var url = 'superadmin/webservices/api/changepassword';
      this.commonservice.PostApi(detail,url).subscribe((response : any) =>{
      if(response.status == 1){
        this.changepasswordSpinner = false;
        var userSubject = response.data;
        $('#btn_close').trigger('click');  
        this.global.successAlert(response.message);
        this.submitted = false;    
        this.userpassword.reset();        
      } else{
        this.changepasswordSpinner = false;
        this.global.dangerAlert(response.message);
        this.submitted = false;    
        this.userpassword.reset();  
      }
    })
   } else{
      this.changepasswordSpinner = false;
      return false;
    }
  }

  updateProfile(){
    if(this.userProfile.value.date_of_birth != this.dob){
      this.dob = this.global.ToDate(this.userProfile.value.date_of_birth);
      this.userProfile.value.date_of_birth = this.dob;
    }

if(this.userProfile.value.emergency_country_code.toString().slice(0,1) != '+'){
  var s=this.userProfile.value.emergency_country_code.split('(');
  var s1= s[1].split(')');
  this.userProfile.value.emergency_country_code=s1[0];
}
    this.submitted = true;

    let userdetail = this.userProfile;
    if(userdetail.valid){
      this.profileSpinner = true;   
      this.ProfileDetail.gender = this.gender;
      var formData = new FormData();
      formData.append('password',this.ProfileDetail.password);
      formData.append('name',userdetail.value.name);
      formData.append('lastname',userdetail.value.lastname)   ;    
      formData.append('gender',this.ProfileDetail.gender);
      formData.append('date_of_birth',userdetail.value.date_of_birth);
      formData.append('address',userdetail.value.address);
      formData.append('city',userdetail.value.city);
      formData.append('state',userdetail.value.state);
      formData.append('country',userdetail.value.country);
      formData.append('about',this.ProfileDetail.about);
      formData.append('zipcode',this.ProfileDetail.zipcode);
      formData.append('lat',this.ProfileDetail.lat);
      formData.append('lang',this.ProfileDetail.lang);
      formData.append('street',this.ProfileDetail.street);
      formData.append('image',this.selectedFile);
      // formData.append('image',this.imgURL);
      formData.append('role_id',this.ProfileDetail.role_id);

      formData.append('device_type','');
      formData.append('device_token','');
      formData.append('emergency_contact_person',userdetail.value.emergency_contact_person);
      formData.append('emergency_country_code',userdetail.value.emergency_country_code);
      formData.append('emergency_contact_no',userdetail.value.emergency_contact_no);

      formData.append('skills',this.ProfileDetail.skill); 
      formData.append('experience',this.ProfileDetail.experience);
      var url = 'superadmin/webservices/api/profile_update' ;
      this.commonservice.PostApis(formData ,url).subscribe((response : any) =>{
      if(response.status == 1){
        this.profileSpinner = false;
        this.imgURL = '';
        if(response.data.id == this.parentDetail.id){
          localStorage.setItem('sw_ParentDetail', <any>JSON.stringify(response.data));    
        }
        localStorage.setItem('sw_loginDetail', <any>JSON.stringify(response.data));
        //this.commonservice.setSubject1(response.data);
        var userSubject = response.data;
        //this.getProfile();
        if(this.CurrentUrl == '/Profile'){
          this.route.navigate(['/consent-form']);
        }
        else{
          if(response.data.isPurchased == '1'){
            this.route.navigate(['/studio']);
          }
          else{
            this.route.navigate(['/home']);
          }
        }
        this.global.successAlert(response.message);
      }
      else{
        this.profileSpinner = false;
        this.global.dangerAlert(response.message);
      }  
    })
  } else{
    if(userdetail.value.date_of_birth.invalid){
      this.global.dangerAlert('Date of birth is required');
    }
     this.profileSpinner = false;
     return false;
   }
  }
/*
* open dailog to select image
*/
  changeImage(){
    $("#file1").trigger('click');
  }

/*
* get Upload image detail
*/
  getUploadFileDetail(event){
    //this.imageChangedEvent = event;

    if (event.target.files.length > 0) {
      this.selectedFile  =  event.target.files[0];
      var mimeType  =  event.target.files[0].type;
      if (mimeType.match(/image\/*/)  ==   null) {
        this.message  =  "Only images are supported.";
        return;
      }
      var reader  =  new FileReader();
      this.imagePath  =  event.target.files;
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload  =  (_event) =>  { 
        this.imgURL  =  reader.result; 
      }
    } 
  } 


  closeModal(){
    this.submitted = false;    
    this.userpassword.reset();
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
        this.ProfileDetail.emergency_country_code = cd;
      }
  })
  }

  /*
  * Google address autocomplete
  * @return address, lat, long
 */
  handleAddressChange(address: any) { 
    this.ProfileDetail.lat = address.geometry.location.lat();
    this.ProfileDetail.lang = address.geometry.location.lng();
    this.userProfile.value.address = this.ProfileDetail.address = address.formatted_address;
    // this.userProfile.value.location_name = address.name;
    this.userProfile.value.location_name = this.ProfileDetail.street = address.name;
    for(var i = 0; i < address.address_components.length; i++){
      var state = address.address_components[i].types[0];
      if(state == "administrative_area_level_1"){
        this.userProfile.value.state = this.ProfileDetail.state = address.address_components[i].long_name;
        // this.userProfile.value.state = address.address_components[i].long_name;
      }
      var city = address.address_components[i].types[0];
      if(city == "administrative_area_level_2"){
        // this.userProfile.value.city = address.address_components[i].long_name;
        this.userProfile.value.city = this.ProfileDetail.city = address.address_components[i].long_name;
      }
      var country = address.address_components[i].types[0];
      if(country == "country"){
        // this.userProfile.value.country = address.address_components[i].long_name;
        this.userProfile.value.country = this.ProfileDetail.country = address.address_components[i].long_name; 
      }
      var postal_code =  address.address_components[i].types[0];
      if(postal_code == "postal_code"){
        this.ProfileDetail.zipcode = address.address_components[i].long_name; 
      }
    }
  }

  getProfile (){
    var cd;
    var today = new Date();
    var currYear = today.getFullYear();
    var url = 'superadmin/webservices/api/get_profile';
    this.commonservice.GetApi(url).subscribe((response : any) =>{
      if(response.status == 1){
        this.CountryList.filter(function(el){
          if(el.code == response.data.emergency_country_code){
          cd =  el.name +' ('+el.code+')' ;
          }
        })
        if(response.data.date_of_birth){
          this.dob = response.data.date_of_birth ; 
        }
      this.ProfileDetail= response.data;
      this.ProfileDetail.emergency_country_code = cd;

      if(this.ProfileDetail.gender){
        this.gender = this.ProfileDetail.gender;
      }
      this.ProfileDetail.mobile1 = this.ProfileDetail.country_code +'  ' + this.ProfileDetail.mobile;    
      this.loading = false;
    } else{
      this.loading = false;
    }
  })
  }

  imageCropped(event: ImageCroppedEvent) {
  this.imgURL = event.base64;  
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }


  changeUserProfile(id){    //  var userinfo = [];
    this.userinfo.id = id;
    localStorage.setItem('sw_loginDetail', <any>JSON.stringify(this.userinfo));
    this.getProfile1();
  }

  getProfile1 (){
    var cd ,url = 'superadmin/webservices/api/get_switch_user_profile';
    this.commonservice.GetApi(url).subscribe((response : any) =>{
      if(response.status == 1){
        this.CountryList.filter(function(el){
          if(el.code == response.data.emergency_country_code){
          cd =  el.name +' ('+el.code+')' ;
          }
        })
        if(response.data.date_of_birth){
          this.dob = response.data.date_of_birth ; 
        }
      this.ProfileDetail= response.data;
      this.ProfileDetail.emergency_country_code = cd;

      if(this.ProfileDetail.gender){
        this.gender = this.ProfileDetail.gender;
      }
      this.ProfileDetail.mobile1 = this.ProfileDetail.country_code +'  ' + this.ProfileDetail.mobile;    
      localStorage.setItem('sw_loginDetail', <any>JSON.stringify(response.data));
     // window.location.reload();
     if(this.CurrentUrl == '/profile'){
      this.route.navigate(['/profiles']);

     } else{
       if(this.CurrentUrl == '/profiles'){
        this.route.navigate(['/profile']);

       }
     }
      this.loading = false;
    } else{
      this.loading = false;
    }
  })
  }

}
