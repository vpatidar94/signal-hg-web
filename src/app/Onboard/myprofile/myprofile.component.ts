import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  public profileSpinner: boolean = false;
  public changepasswordSpinner: boolean = false;
  public ProfileDetail : any =[];
  public submitted: boolean = false;
  public Usertype : any = 'me';
  public gender : any = 'male';
  public loading : boolean = true;
  public CountryList : any =[];
  public selected: boolean = false;
  public skillList : any = [];
  public subcategoryText: any = [];
  public selectedFile: any;
  public userUpdatedImage: any; 
  public imagePath;
  imgURL: any;
  public message: string;
  maxDate: Date;
  public dob : any;
  public dropdownSettings :IDropdownSettings;
  public selectedIDs : any;
  public CurrentUrl : any ;
  public changeDate : any = new Date();
  public shiftSpinner : boolean = false;
  public shiftDetail : any  = [];
  public minValue : any = new Date();
  public businessID : any ;
  public shiftID : any ;
  public statusVal : any;
  public requestDetail : any = [];
  public schdule_id : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate);  
        this.CurrentUrl = this.route.url;     
   }


 
  ngOnInit(): void {
    this.getskills();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };   
    //this.getProfile();
    if(this.CurrentUrl == '/my-Profile'){
      $('#changepass').trigger('click');
    }
    this.upcoming_shift();
  }

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
    experience: new FormControl('',Validators.compose([
      Validators.required])),
    about: new FormControl('',Validators.compose([
      Validators.required ])),
    registration:new FormControl(''), 
  }) 

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

  usershift = new FormGroup({ 
    changerequest: new FormControl('',Validators.compose([
      Validators.required])),
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

    // convenience getter for easy access to form fields
  get sf() { return this.usershift.controls; }
  

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
    if(this.userProfile.value.date_of_birth  != this.dob){
      this.dob = this.global.ToDate(this.userProfile.value.date_of_birth);
      this.userProfile.value.date_of_birth  =this.dob;
    }

    var subcatText;  
    if(this.subcategoryText.length !=0){
      this.selected = false;
      this.subcategoryText.filter(function(el) {
        if(subcatText){
          subcatText =  el.id +","+ subcatText;
        }
        else{
          subcatText =  el.id;  
      }
    });
    } else{
      this.selected = true;
    }
    this.ProfileDetail.skill = subcatText;

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
      formData.append('about',userdetail.value.about);
      formData.append('zipcode',this.ProfileDetail.zipcode);
      formData.append('lat',this.ProfileDetail.lat);
      formData.append('lang',this.ProfileDetail.lang);
      formData.append('street',this.ProfileDetail.street);
      formData.append('image',this.selectedFile);
      formData.append('role_id',this.ProfileDetail.role_id);
      formData.append('device_type','');
      formData.append('device_token','');
      formData.append('emergency_contact_person',this.ProfileDetail.emergency_contact_person);
      formData.append('emergency_country_code',this.ProfileDetail.emergency_country_code);
      formData.append('emergency_contact_no',this.ProfileDetail.emergency_contact_no);

      formData.append('skills',this.ProfileDetail.skill); 
      formData.append('experience',userdetail.value.experience);
      formData.append('registration',userdetail.value.registration);
      var url = 'superadmin/webservices/api/profile_update' ;
      this.commonservice.PostApis(formData ,url).subscribe((response : any) =>{
      if(response.status == 1){
        this.profileSpinner = false;
        localStorage.setItem('sw_loginDetail', <any>JSON.stringify(response.data));
        // this.commonservice.setSubject1(response.data);
        var userSubject = response.data;
        // this.getProfile();
        if(this.CurrentUrl == '/my-Profile'){
          this.route.navigate(['/studio']);
        }
        else{
          this.route.navigate(['/home']);
        }
        this.global.successAlert(response.message);
        this.imgURL = '';
      }
      else{
        this.profileSpinner = false;
        this.global.dangerAlert(response.message);
      }
    })
  } else{
    //this.global.dangerAlert('Something Went Wrong');
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
    this.usershift.reset();
    this.shiftID = '';
    this.businessID = '';
    this.statusVal = '';
    this.requestDetail = [];
  }

  getGender(event){
    this.gender = event.target.value;
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
    this.ProfileDetail.street = address.name;
    for(var i = 0; i < address.address_components.length; i++){
      var state = address.address_components[i].types[0];
      if(state == "administrative_area_level_1"){
        this.userProfile.value.state =this.ProfileDetail.state = address.address_components[i].long_name;
        // this.userProfile.value.state = address.address_components[i].long_name;
      }
      var city = address.address_components[i].types[0];
      if(city == "administrative_area_level_2"){
        // this.userProfile.value.city = address.address_components[i].long_name;
        this.userProfile.value.city =this.ProfileDetail.city = address.address_components[i].long_name;
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
    var url = 'superadmin/webservices/api/get_profile';
    this.commonservice.GetApi(url).subscribe((response : any) =>{
      if(response.status == 1){
       this.dob = response.data.date_of_birth ;
      var  selectedlist =[]; 
      if(response.data.skill){
        var skillss = response.data.skill.split(',') ;
        this.skillList.filter(function(el){       
          skillss.filter(function (ell){
            if(el.name == ell){
              selectedlist.push(el);
            }
          })
        })
        this.subcategoryText = selectedlist;
      }      
      this.ProfileDetail= response.data;
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


  getskills(){
    var newarray =[];
    var url = 'superadmin/webservices/api/get_skills';
    this.commonservice.GetApi(url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.filter(function(el){
          newarray.push({'id': el.id, 'name': el.name})
        })        
        this.skillList = newarray;
        this.getProfile();
      }
    }))
  }

  changeskill(){
    var subcatText;  
    if(this.subcategoryText.length !=0){
      this.selected = false;
      this.subcategoryText.filter(function(el) {
        if(subcatText){
          subcatText =  el.id +","+ subcatText;
        }
        else{
          subcatText =  el.id;  
      }
    });
    } else{
      this.selected = true;
    }
    this.ProfileDetail.skill = subcatText;
  }

  upcoming_shift(){
    var selectdate, commentsData;
    if(this.changeDate){
      selectdate = this.global.toTimestamp(this.changeDate.toUTCString());
    } else {
      selectdate='';
    }
    var detail = { "pageid":"1",    "business_id":'',    "upcoming_date":selectdate} ;
    var url = 'superadmin/webservices/instructor/shift_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        if(response.data.length!=0){
          var self = this;
          response.data.filter(function (el){
            // Date Conversion UTC
            el.shift_date_new = self.global.dateConvert(el.shift_date);

            //time conversion
            el.start_time_new = self.global.timeConvert(el.start_time);

            //time conversion
            el.end_time_new = self.global.timeConvert(el.end_time);
            if(self.schdule_id){
              if(el.id == self.schdule_id){
                self.requestDetail = el.comment;
              }
            }
            if(el.comment.length != 0){ 
              el.comment.filter(function (ell){
                // Date Conversion UTC
                ell.date_new = self.global.dateConvert(ell.create_dt);
                ell.time = self.global.timeConvert(ell.create_dt);
              })
            }
          })
        }
        this.shiftDetail = response.data;
      
      } else{
        this.loading = false;
        this.shiftDetail = [];
      }
    }))
  }

  shiftChangeRequest(){
      this.loading = true;
      this.submitted = true;
      if(this.usershift.valid){
        var url = 'superadmin/webservices/instructor/shift_cancel_request';
        var detail = {'business_id':this.businessID,  'shift_id':this.shiftID,  'reason': this.usershift.value.changerequest,'shift_schedule_id':this.schdule_id};
        this.commonservice.PostApi(detail,url).subscribe(((response : any )=>{
          if(response.status == 1){
            this.global.successAlert(response.message);
            this.loading = false
            this.submitted = false;
            this.usershift.reset();
            this.upcoming_shift();
           // this.shiftCommentDetail();
          } else {
            this.global.dangerAlert(response.message);      
            this.loading = false
          }
        }))
      } else{
        this.loading = false;
        return false;
      } 
  } 

  changeSelection(item){
    this.requestDetail = [];
    this.shiftID = item.shift_id;
    this.schdule_id = item.id;
    this.businessID = item.business_id;
    this.statusVal = item.status;
    this.requestDetail= item.comment;
  }
  
  increaseDate(){
    // add a day
    this.changeDate.setDate(this.changeDate.getDate() + 1);
    this.changeDate = new Date(this.changeDate)
    this.upcoming_shift();    
  }
    
  decreaseDate(){
  // decrease a day
      this.changeDate.setDate(this.changeDate.getDate() - 1);
      this.changeDate = new Date(this.changeDate)
      this.upcoming_shift();    
  }

  shiftCommentDetail(){
    var detail = { "business_id":this.businessID ,"schedule_id": this.schdule_id };
    var url = 'superadmin/webservices/instructor/shift_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1 ){
        
      } else {

      }
    }))
  }

  }
