import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-client-search',
  templateUrl: './staff-client-search.component.html',
  styleUrls: ['./staff-client-search.component.scss']
})
export class StaffClientSearchComponent implements OnInit {

  public loading : boolean = true;
  public businessDetail : any = [];
  public userDetail : any = []  ;
  public pass_buy : any;
  public navData : any =[];
  public ID : any;
  public search_text : any;
  public clientDetail : any = [];
  public gender : any = 'male';
  public CountryList : any =[];
  public country_code : any;
  public dob : any;
  maxDate: Date;
  public currentUrl : any;
  public submitted: boolean = false;
  public PurchasedPassData : any =[];
  public PassID : any;
  public Customerdata: any=[];

  public eventDetail_Options: OwlOptions = {
    //loop:true,

    margin:10,
    autoplay: false,
    mouseDrag: true,     
    nav:true, 
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    dots: false,
    responsive: {  
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items:1
      },
      940: {
        items: 1
      },
    },
    loop:false,

  }

  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  private location :Location, public commonservice: DataService) { 
    this.currentUrl = this.route.url;    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.maxDate = new Date(currentYear - 18, currentMonth, currentDate); 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_addclientDetail', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_addclientDetail')){
        this.ID= JSON.parse(localStorage.getItem('sw_addclientDetail'));
      }
    } else {      
      if(localStorage.getItem('sw_addclientDetail')){
        this.ID= JSON.parse(localStorage.getItem('sw_addclientDetail'));
      }
    } 
  }

  addnewClient = new FormGroup({
    name: new FormControl('',Validators.compose([
      Validators.required,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    lastname: new FormControl('',Validators.compose([
      Validators.required,Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ])),
    email: new FormControl('',Validators.compose([
      Validators.required,Validators.email])),
    country_code: new FormControl('',Validators.compose([
      Validators.required])),
    mobile: new FormControl('',Validators.compose([
      Validators.required])),
    // date_of_birth: new FormControl('',Validators.compose([
    //   Validators.required])),
    discount: new FormControl(''), 
  })

// convenience getter for easy access to form fields
  get f() { return this.addnewClient.controls; }

 ngOnInit(): void {
   if(localStorage.getItem('sw_previous_url')== '/customer-detail'){
    this.search_text= localStorage.getItem('sw_Instructor_Search_val');
   }
    this.ClientList();
    this.getCountry();
    localStorage.setItem('sw_previous_url',this.currentUrl);
  }
 
  ClientList(){
    localStorage.setItem('sw_Instructor_Search_val',this.search_text);
    this.loading = true;
    var today = new Date();
    var currYear = today.getFullYear();
    var detail = { "pageid":"1", "business_id":this.businessDetail.business_id,'class_id':this.ID.id, "search_val":this.search_text}
    var url = 'superadmin/webservices/instructor/search_customer_list' ;
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        var self =this;
        response.data.filter(function (el){
          el.age = self.global.ageCalculation(el.date_of_birth);
          // var birthyear = el.date_of_birth.split('-');
          // var age = currYear - birthyear[0];
          // el.age = age;
          el.pass_buy= false;
          if(el.my_passes_details.length != 0){
            el.my_passes_details.filter(function (ell){ 
              ell.start_date_utc_new = self.global.dateConvert(ell.start_date_utc);
              ell.end_date_utc_new = self.global.dateConvert(ell.end_date_utc);
              ell.checked = false;
            })
          }
        })
        // this.PurchasedPassData = response.data.my_passes_details;
        self.clientDetail = response.data;
       
        //this.reset();
        self.loading = false;
      } else{
        this.clientDetail = [];
        //this.reset();
        this.loading= false;
      }
    }))
  }

  onAddclient(){
    this.loading = true;
    var newadte;
    if(this.dob){
      newadte = this.global.ToDate(this.dob);
    }
    var s=this.country_code.split('(');
    var s1= s[1].split(')');
    var refername =this.userDetail.name + ' ' + this.userDetail.lastname ;
    this.submitted = true;
    let userdetail = this.addnewClient;    
    if(userdetail.valid){
      var url = 'superadmin/webservices/instructor/add_client';
      var detail = {"name":userdetail.value.name, "lastname":userdetail.value.lastname, "email":userdetail.value.email,"country_code":s1[0], "mobile":userdetail.value.mobile, 
      "discount":userdetail.value.discount,"referred_by":refername}
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.submitted = false;
          this.dob ='';
          this.addnewClient.reset();
          this.ClientList();
          if(this.currentUrl == "/clientview"){
            this.route.navigate(['/appointment']);
          } 
          this.loading = false;
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      }))
    } else{
      this.loading = false;
    }
  }

  redirectUrl(Id){    
    this.route.navigate(['/customer-detail'],{state:{Id : Id}});
  }
  
  redirectUrl1(id,url,urlcurrent){
    if(urlcurrent){     
        var detail ={'id':id.pass_id ,'url':this.currentUrl};
        this.route.navigate([url],{state:{Id : detail}});  
    } else{
      this.route.navigate([url],{state:{Id : id}});
    }
  }

  reset(){
    this.search_text ='';
    this.ClientList();
    // this.addnewClient.reset();
    this.submitted = false;
    this.dob ='';
    // this.addnewClient.value.country_code = this.country_code;
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
       this.country_code = cd;
       }
    })
  }

  classSignup(items){      this.loading = true;

    if(items.my_passes_details.length !=0){
      this.Customerdata = items;
      this.PurchasedPassData = items.my_passes_details;
      // if(this.PurchasedPassData.length == 1){
      //   this.PassID = this.PurchasedPassData[0].pass_id;
      //   this.classSignupWithpassId(items);
      // } else{
     $('#passselect').trigger('click'); 
    // } 
    // $('#btnpass').trigger ('click')  ;
     //this.makeActive();
     this.loading = false;
    } else{
      this.global.dangerAlert('Please purchase the pass');
      items.pass_buy = true;
      this.loading = false;
    }
  }

  classSignupWithpassId(items){
    var url = 'superadmin/webservices/instructor/new_client_signup';
    var detail ={"user_id":items.id, "business_id":this.businessDetail.business_id,
    "class_id":this.ID.id,  "schedule_id":this.ID.sedule_id,
    "instractor_id":this.userDetail.id, "pass_id": this.PassID}
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.route.navigate([this.ID.url]);
        this.loading = false;
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
        return false;
      }
    }))
  }
  
  getPassId(event){
    var self= this;
    self.PurchasedPassData.filter(function (el){
      if(el.pass_id == event.target.id){
        el.checked = event.target.checked;
      }
    })
    this.PassID = event.target.id;
  }

  closed(){
    this.PurchasedPassData.filter(function (el){
        el.checked = false;
    })
  }

  tabchage(){
    $('#profile-tab').click(function(){
      $(this).hide();
      $('#home-tab').show();
    });
    $('#home-tab').click(function(){
     $(this).hide();
     $('#profile-tab').show();
   })
  }

  makeActive(){
    setTimeout(()=>{
      var parent = document.querySelector('#purchasePassPopupSlide') as HTMLElement;
    parent.firstElementChild.classList.add('active');
    },500)
  }
}