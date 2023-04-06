import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

declare var $; 

@Component({
  selector: 'app-staff-my-appointment-booking-detail',
  templateUrl: './staff-my-appointment-booking-detail.component.html',
  styleUrls: ['./staff-my-appointment-booking-detail.component.scss']
})
export class StaffMyAppointmentBookingDetailComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = true;
  public booking_Detail : any = [];
  public backUrl : any ;
  public showPayment : boolean = true;
  public paymentMode : any;
  public cardType : any;
  public cardval : any;
  public cardMethod : any ;
  public submitted : any ;
  public TipAmount : any ;
  public customerData : any = [];
  public userInfo : any = [] ;
  public CardData : any;


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.userInfo =JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
     //this.backUrl = this.commonservice.back() ;  
    //  console.log(this.commonservice.back());
    this.backUrl = localStorage.getItem('sw_AppointUrl') ;     
    this.booking_Detail = JSON.parse(localStorage.getItem('sw_Booking_detail'));
    this.loading = false;
  }

  paymentCard = new FormGroup({
    card_number: new FormControl('',Validators.compose([
      Validators.required 
    ])),
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ])), 
    expiry: new FormControl('',Validators.compose([
      Validators.required
    ])),  
    card_holder_name: new FormControl('',Validators.compose([
      Validators.required, Validators.pattern('^[a-zA-Z]{1,200}|[a-zA-Z][/s.][a-zA-Z]{1,200}')
    ]))
  })
  get f() { return this.paymentCard.controls; }

  ReferenceDetail = new FormGroup({
    referenceid: new FormControl('',Validators.compose([
      Validators.required
    ])),
    payment_note: new FormControl('')
  })
  get rf() { return this.ReferenceDetail.controls; }

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })
  get sf() { return this.savedCard.controls; }

  ngOnInit(): void {
    if(this.backUrl   != '/appointment' && this.backUrl != '/my-appointment'){
    this.getSaveCardDetail();
    }
  }

  getDetails(){
    this.loading = true;
    var today = new Date();
    var currYear = today.getFullYear();
    var url;
    var detail = { "pageid": "1", "transaction_id":  this.booking_Detail.transaction_id};
    if(this.backUrl   == '/appointment' || this.backUrl == '/my-appointment'){
      url= 'superadmin/webservices/instructor/my_book_services_list';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          response.data[0].start_date_utc_new = this.global.dateConvert(response.data[0].shift_date);
          response.data[0].start_time_new = this.global.timeConvert(response.data[0].start_time);
          response.data[0].end_time_new = this.global.timeConvert(response.data[0].end_time);
          // var birthyear = response.data[0].date_of_birth.split('-');
          // var age = currYear - birthyear[0];
          // response.data[0].age = age;
          response.data[0].age = this.global.ageCalculation(response.data[0].date_of_birth);

          // response.data[0].tax_amount =  parseFloat( response.data[0].tax1_rate) + parseFloat(response.data[0].tax2_rate);
          // response.data[0].sub_total = parseFloat(response.data[0].amount) + response.data[0].tax_amount;
          response.data[0].Name = response.data[0].name +' '+ response.data[0].lastname;
          if(response.data[0].family_user_id != 0){
            // var birthyear = response.data[0].family_dob.split('-');
            // var age = currYear - birthyear[0];
            // response.data[0].age = age;
            response.data[0].age = this.global.ageCalculation(response.data[0].family_dob);

            response.data[0].Name = response.data[0].family_member_name ;
            response.data[0].gender = response.data[0].family_gender ;
            response.data[0].profile_img = response.data[0].family_profile_img ;
          }
          this.booking_Detail = response.data[0];
          localStorage.setItem('sw_Booking_detail', response.data[0]);
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    } else {
      url= 'superadmin/webservices/api/my_book_services_list';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          response.data[0].start_date_utc_new = this.global.dateConvert(response.data[0].shift_date);
          response.data[0].start_time_new = this.global.timeConvert(response.data[0].start_time);
          response.data[0].end_time_new = this.global.timeConvert(response.data[0].end_time);
          response.data[0].age = this.global.ageCalculation(response.data[0].date_of_birth);

          // response.data[0].tax_amount =  parseFloat( response.data[0].tax1_rate) + parseFloat(response.data[0].tax2_rate);
          // response.data[0].sub_total = parseFloat(response.data[0].amount) + response.data[0].tax_amount;
          response.data[0].Name = response.data[0].name +' '+ response.data[0].lastname;
          if(response.data[0].family_user_id != 0){
            response.data[0].age= this.global.ageCalculation(response.data[0].family_dob);
            response.data[0].Name = response.data[0].family_member_name ;
            response.data[0].gender = response.data[0].family_gender ;
            response.data[0].profile_img = response.data[0].family_profile_img ;
          }
          this.booking_Detail = response.data[0];
          localStorage.setItem('sw_Booking_detail', response.data[0]);
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    }
  }

  ChnageBooking(){
    var url = 'superadmin/webservices/instructor/service_status_change';
    var detail = {'transaction_id': this.booking_Detail.transaction_id , 'business_id':this.businessDetail.business_id};
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) =>{
      if(response.status == 1){
        this.global.successAlert(response.message)
        this.getDetails();
      } else{
        this.global.dangerAlert(response.message)
      }
    }))
  }

  canclebooking(){
    var url ,detail;
    if(this.backUrl == '/appointment' || this.backUrl == '/my-appointment' ){    
      url = 'superadmin/webservices/api/service_appointment_cancel';
    } else{
      url ='superadmin/webservices/instructor/service_appointment_cancel';
    }
    detail ={"transaction_id" :  this.booking_Detail.transaction_id};
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        //this.route.navigate(['/cancel-appointment']);
        this.getDetails();
        this.loading = false;
      } else{
        this.global.dangerAlert(response.message)
        this.loading = false;
      }
    }))
  }

  redirect(){
    this.route.navigate([this.backUrl]);
  }

  getpaymentMode(event){
    var self= this;
    self.paymentMode = event.target.id;
    self.cardval = event.target.value
  }

  PayAtStudio(){    
    this.submitted = true;
    if(this.ReferenceDetail.valid){
      this.loading = true;
    var detail = {
      'service_id':this.booking_Detail.service_id ,
      'payment_transaction_id':this.ReferenceDetail.value.referenceid,
      'comment':this.ReferenceDetail.value.payment_note,
      'transaction_id': this.booking_Detail.transaction_id,
      'amount': this.booking_Detail.sub_total,
      'tip_comment': this.TipAmount
      };
    var url = 'superadmin/webservices/instructor/buy_now_services_cash';  
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.ReferenceDetail.reset();
        this.submitted = false;
        this.loading = false;
        this.paymentMode = 2;
        this.showPayment = true;
        this.getDetails();
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
        this.submitted = false;

      }
    this.loading = false;    
  }))
} else{
this.loading = false;
return false;
}

  }

  payment(status: any,details : any, response: any){   
    this.loading = true;
    if (status == 402) {
      this.loading = false;
      this.global.dangerAlert(response.error.message);
    } else {
      var url;
      var detail = {
        "tip_comment":this.TipAmount,
        "service_id":this.booking_Detail.service_id ,
        "token":response.id,
        "savecard":"0",
        "card_id":response.card.id,
        "transaction_id": this.booking_Detail.transaction_id,
        "number": details.number,
        "expiry_month": details.exp_month,
        "expiry_year": details.exp_year,
        "cvd": details.cvc,
        "business_id":this.businessDetail.business_id,
        "country_code":"",
        // "customer_name":this.paymentCard.value.card_holder_name,
      }

      if(this.backUrl   == '/appointment' || this.backUrl == '/my-appointment'){
        //url = 'superadmin/webservices/instructor/buy_now_services';
        url="superadmin/webservices/instructor/clover_buy_now_services_single"
        this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
          if(response.status == 1){
            this.global.successAlert(response.message);
            this.loading = false;
            this.submitted = false;
            this.paymentCard.reset();
            this.paymentMode = 2;
            this.showPayment = true;
            this.getDetails();
          } else{
            this.global.dangerAlert(response.message);
            this.loading = false;
          }
        })) 
      } else{
      // url = 'superadmin/webservices/api/buy_now_services';
        url="superadmin/webservices/api/clover_buy_now_services_single"
        this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
          if(response.status == 1){
            this.global.successAlert(response.message);
            this.loading = false;
            this.submitted = false;
            this.paymentCard.reset();
            this.paymentMode = 2;
            this.showPayment = true;
            this.getDetails();
          } else{
            this.global.dangerAlert(response.message);
            this.loading = false;
          }
        })) 
      }
      //console.log(this.TipAmount);
    }
  }

  generateToken(type){
    this.submitted = true;
      let detail;
      if(type == 1){
        if (this.paymentCard.valid) {
        var expired = this.global.ExpiryCheck(this.paymentCard.value.expiry);
        if(expired)  {
          this.paymentCard.value.expiry_month = expired[0];
          this.paymentCard.value.expiry_year = expired[1];
        }  else{
          return false;
        }
      } else{
        this.loading = false;
        return false;
      } 
        detail = {   
          "number": this.paymentCard.value.card_number,
          "exp_month": this.paymentCard.value.expiry_month,
          "exp_year": this.paymentCard.value.expiry_year,
          "cvc": this.paymentCard.value.cvv_no,  
        };
      } else {
        if (this.savedCard.valid) {
        detail = {   
          "number": this.CardData.number,
          "exp_month": this.CardData.expiry_month,
          "exp_year": this.CardData.expiry_year,
          "cvc": this.savedCard.value.cvv_no,  
        };
      } else{
        return false;
      } 
      }

    this.loading =true;
        (<any>window).Stripe.card.createToken(detail, (status: number, response: any) => this.payment(status,detail,response));
  } 

  getCardType(event){
    var self= this,selected ;
    self.cardType = event.target.id;
    self.customerData.filter(function (el){
      if(el.card_id == self.cardType){
        el.checked = event.target.checked;
        selected = el;
      }
    })
    this.CardData = selected;
  }

  sendEmail(){
    var detail = {'transaction_id':this.booking_Detail.transaction_id};
    var url = 'superadmin/webservices/instructor/send_appointment_mail';
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.global.successAlert(response.message)
      } else {
        this.global.dangerAlert(response.message);
      }
    }));
  }

  getSaveCardDetail(){
    var detail= {"userid" :this.userInfo.id };
    var url = 'superadmin/webservices/api/cardGet' ;
    this.commonservice.PostApis(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.filter(function (el){
          el.checked = true;
          el.card_type = el.card_type.toLowerCase();
        })
        this.customerData = response.data;
      } else{
      }
    }))
  }
}
