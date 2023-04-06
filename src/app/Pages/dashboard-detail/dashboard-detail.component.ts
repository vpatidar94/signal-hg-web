import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss']
})
export class DashboardDetailComponent implements OnInit {

  public navData : any = [];
  public ID : any;
  public businessDetail : any = [];
  public ClassDetail : any = []; 
  public ServiceDetail : any = [];
  public WorkshopDetail : any = [];
  public StaffDetail : any = [];
  public PassDetail :any = [];
  public ProductDetail: any = [];
  public userDetail : any = [];
  public currentUrl : any ;
  public loading : boolean = true;
  public studioSpinner: boolean = false;
  public verifySpinner: boolean = false;
  public submitted: boolean = false;
  public addresslength : any;
  public PassData : any = [];
  public punchPassDetail :any = [];
  public timePassDetail :any = [];
  public recurringPassDetail :any = [];


  public eventDetail_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    dots:false,
    mouseDrag: true, 
    nav:true, 
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    responsive: {  
      0: {
        items: 1,
        loop: true,
      },
      400: {
        items:2,
        loop: true,
      },
      740: {
        items: 4,
        loop: true,
      },     
      1000: {
        items: 4,
        loop: true,
      }
    },
  //  nav: true
  }

  public passDetail_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    mouseDrag: true, 
    nav:true, 
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    dots: false,
    responsive: {  
      0: {
        items: 1,
        loop: true,
      },
      400: {
        items: 1,
        loop: true,
      },
      740: {
        items: 1,
        loop: true,
      },     
      1000: {
        items: 2,
        loop: true,
      },     
      1280: {
        items: 2,
        loop: true,
      }
    },
  }

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService, private location :Location) { 
        this.currentUrl = this.route.url;   
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_DetailId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_DetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_DetailId'));
      }
    } else {      
      if(localStorage.getItem('sw_DetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_DetailId'));
      }
    } 
    localStorage.setItem('sw_BackClass','/detail');
  }

  registerStudio = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required,
      Validators.email      
    ])),
  })


  verfyStudio = new FormGroup({  
    verify_code: new FormControl('',Validators.compose([
      Validators.required,     
    ]))
  })


  ngOnInit(): void {
    if(this.userDetail.role_id == '3'){
      this.getBusinessDetail();
    } else{
      this.getStaffBusinesDetail();    
    }

  }

   // convenience getter for easy access to form fields
   get f() { return this.registerStudio.controls; }

  // convenience getter for easy access to form fields
    get f1() { return this.verfyStudio.controls; }


  getBusinessDetail(){
    var detail ={ "business_id":this.ID};
    var url = 'superadmin/webservices/api/get_business_detail' ;
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
       this.businessDetail = response.data;
       this.ProductDetail = response.data.product_details;
       this.addresslength = this.businessDetail.address.length;
       if(response.data.pass_details.length != 0){
        var self = this, ageal;
        response.data.pass_details.filter(function (el){
          el.start_date_utc_new = self.global.dateConvert(el.passes_start_date);
          el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
          el.is_purchase = 0;
          if(el.age_restriction =='Over')
          {
            if(self.userDetail.age >= el.age_over_under){
              ageal = true;
            } else{
              ageal = false;
            }
          } else if(el.age_restriction =='Under') {
            if(self.userDetail.age < el.age_over_under){
              ageal = true;
            } else{
              ageal = false;
            }
          } else{
            ageal = true;
          }
          el.ageallow = ageal;
          if(el.pass_type_name == 'Punch Card'){
            self.punchPassDetail.push(el);
          } else if(el.pass_type_name == 'Time Frame')  {
            self.timePassDetail.push(el);
          } else {
            self.recurringPassDetail.push(el);
          }
        })
      }
        this.PassData = response.data.pass_details;


       var detail = {"business_id":response.data.business_id,'business_name':response.data.business_name, 'address':response.data.address,'logo':response.data.logo,'business_img':response.data.business_img,'email':response.data.email,'latitude':response.data.latitude,'longitude':response.data.longitude,'business_phone':response.data.business_phone,'favourite':response.data.favourite,'video_access':response.data.video_access};
       localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(detail));
       this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }


  redirect(url){
    if(this.businessDetail.is_register == 1){
       this.route.navigate([url]);
    } else {
      this.global.dangerAlert('Please register with studio');
    }
  }

  // redirectUrl(url,Id){
  //   this.route.navigate([url],{state:{Id : Id}});
  // }

  redirectUrl(id,url,urlcurrent){
    if(urlcurrent){     
      if(id.ageallow){
        var detail ={'id':id.id ,'url':this.currentUrl,'user_booking_id':id.user_booking_id};
        this.route.navigate([url],{state:{Id : detail}});  
      } else{
        this.global.dangerAlert('You are not eligible');
      }
    } else{
      this.route.navigate([url],{state:{Id : id ,backurl:this.currentUrl}});
    }
  }

  RegisterStudio(){
    this.loading = true;
    var detail = {"business_id":this.businessDetail.business_id,    "email":this.businessDetail.email};
    var url  = 'superadmin/webservices/instructor/register_studio';
    this.commonservice.PostApi( detail,url).subscribe(((response : any) =>{
      if(response.status == 1){
        //console.log(response.data);btn_close
        //$('#VerifyStudio').trigger('click');
        this.global.successAlert(response.message);
        this.getStaffBusinesDetail();  
        this.route.navigate(['/home']) ;
       // this.submitted = false;      
        // $('#btn_close1').trigger('click');
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }))
  }

  VerifyStudio(){
    this.submitted = true;    
    let userdetail = this.verfyStudio;
    if(userdetail.valid){
    var detail = { "business_id":this.businessDetail.business_id,    "verify_code":userdetail.value.verify_code};
    var url = 'superadmin/webservices/instructor/studio_verify';
    this.commonservice.PostApi( detail,url).subscribe(((response : any) =>{
      if(response.status == 1){
        this.global.successAlert(response.message);
        $('#btn_close').trigger('click');
        this.getStaffBusinesDetail();   
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
  } else{
    this.verifySpinner = false;
    return false;
  }
  }


  ResendStudio(){
    var url = 'superadmin/webservices/instructor/studio_resend_otp';
    var detail = {"business_id":this.businessDetail.business_id,    "email":this.registerStudio.value.email};
    this.commonservice.PostApi( detail,url).subscribe(((response : any) =>{
      if(response.status == 1){   
        this.global.successAlert(response.message);    
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
  }

  closeModal(){
    this.submitted = false;    
    this.verfyStudio.reset();
  }

  getStaffBusinesDetail(){
    var detail ={ "business_id":this.ID};
    var url = 'superadmin/webservices/instructor/get_business_detail' ;
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
       this.businessDetail = response.data;
       var detail = {"business_id":response.data.business_id,'business_name':response.data.business_name, 'address':response.data.address,'logo':response.data.logo,'business_img':response.data.business_img,'email':response.data.email,'latitude':response.data.latitude,'longitude':response.data.longitude,'business_phone':response.data.business_phone,'favourite':response.data.favourite,'video_access':response.data.video_access};
       localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(detail));
       this.addresslength = this.businessDetail.address.length;
       this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  addFav(id,status,type){
    this.loading = true;
     var detail ={  "service_type":type,   "service_id":id,   "status":status};
     var url = 'superadmin/webservices/api/favourite';
     this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        if(this.userDetail.role_id == '3'){
          this.getBusinessDetail();
        } else{
          this.getStaffBusinesDetail();    
        }      
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
  }

  reset(){
   var url=localStorage.getItem('sw_detailBack');
    this.route.navigate([url]);
  }

  redirectdetail(){
    if(this.businessDetail.user_booking == 1){
      this.route.navigate(['/studio-detail'],{state:{Id : this.businessDetail.business_id ,backurl:this.currentUrl}});
    } else {
      // this.route.navigate(['/studio-membership-plan']);
      this.global.dangerAlert('Seems you have not purchased anything from this studio. Please purchase to continue.');
    }
  }
}
