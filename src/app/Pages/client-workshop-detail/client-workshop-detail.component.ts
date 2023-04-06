import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-workshop-detail',
  templateUrl: './client-workshop-detail.component.html',
  styleUrls: ['./client-workshop-detail.component.scss']
})
export class ClientWorkshopDetailComponent implements OnInit {

  public businessDetail : any =[];
  public navData : any =[];
  public ID : any = [];
  public loading : boolean = true;
  public ClassData : any =[];
  public classStatus: any ;
  public workshopStatus: any;
  public currentUrl : any ;
  public instrustorData : any = [] ;
  public search_text : any;
  public clientDetail : any = [];
  public CustomerDetail : any = [];
  public PassData : any = [];
  public PurchasedPassData : any = [];
  public PassID: any;
  public View : any = 1;
  public userInfo : any = [] ;
  public selectedClientInfo : any = [];
  public submitted : boolean;
  public q1_answer : any;
  public q2_answer : any;
  public q3_answer : any;
  public instructorpayment : Boolean = false;
  public paymentMode : any;
  public q4_answer2 : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];

  public q4_answer1 : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];

  public q4_answer : any = [{'id': 1, 'checked': false, 'text':'Cold or flu like symptoms: Headache, Fever, Cough'} ,{'id': 3, 'checked': false, 'text':'Chest pain'},{'id': 2, 'checked': false, 'text':'Difficulty breathing'}];
  public q4_answers : any =[];

  public QuestionShhet : any =[];
  public CovidSpinner : any;
  public covid_status : any;
  public paymentval: boolean ;
  public savecard : any = 0 ;
  public cardType : any;
  public paynow : boolean ;
  public CardData : any;
  public customerData : any = [];

  public eventDetail_Options: OwlOptions = {
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
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

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
      Validators.required
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

  CovidForm = new FormGroup({
    q1_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    q2_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])),
    q3_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])) ,
    q4_answer: new FormControl('',Validators.compose([
      Validators.required,
    ])),
  })
  get f1() { return this.CovidForm.controls; }

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })
  get sf() { return this.savedCard.controls; }

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService,private location : Location) { 
    this.currentUrl = this.route.url;   
    this.userInfo =JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_ClassId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_ClassId')){
        this.ID= JSON.parse(localStorage.getItem('sw_ClassId'));
      }
    } else {      
      if(localStorage.getItem('sw_ClassId')){
        this.ID= JSON.parse(localStorage.getItem('sw_ClassId'));
      }
    } 
    if(this.currentUrl == '/workshops-detail'){
      this.getSaveCardDetail();
    }
    this.getWorkshopDetail();
  }
  
 

  ngOnInit(): void {
  }

  getWorkshopDetail(){
    var detail,url;
    var today = new Date(); 
    var send_date = this.global.ToDate(today);
    if(this.ID.currentdate){
      send_date =this.ID.currentdate;
    }
    this.loading = true;
    // var detail ={  "pageid":"1",  "business_id":this.businessDetail.business_id,  "workshop_id":this.ID.id ,"select_dt":send_date};
    // this.commonservice.getWorkshopDetail(detail).subscribe(((response : any) => {

    if(this.currentUrl == "/workshop-detail"){
      detail ={ "business_id":this.businessDetail.business_id,  "workshop_id":this.ID.id , 'schedule_id' :this.ID.schduleId };
      url = 'superadmin/webservices/instructor/business_workshop_details';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          
            // Date Conversion UTC
            response.data.start_date_utc_new = this.global.dateConvert(response.data.schedule_date);
            response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date_utc);
                // time conversion
  
                response.data.from_time_new = this.global.timeConvert(response.data.start);
                response.data.to_time_new = this.global.timeConvert(response.data.end);
          
          //   if(response.data.customer_details.length != 0){
          //     response.data.customer_details.filter(function (el){
          //     // var birthyear = el.date_of_birth.split(' ');
          //     // var age = currYear - birthyear[birthyear.length-1];
          //     var birthyear = el.date_of_birth.split('-');
          //     var age = currYear - birthyear[0];
          //     el.age = age;
          //   })
          // }
              if(response.data.instructor_details.length != 0){
            var self = this, ageal;
            response.data.instructor_details.filter(function (el){
              el.from_time_new = self.global.timeConvert(el.from_time_utc);
              el.to_time_new = self.global.timeConvert(el.to_time_utc);
            })
          }
          // if(response.data.passes_details.length != 0){
          //   var self = this;
          //   response.data.passes_details.filter(function (el){
          //     el.start_date_utc_new = self.global.dateConvert(el.start_date_utc);
          //     el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
          //     if(el.age_restriction =='Over')
          //       {
          //         if(self.userInfo.age >= el.age_over_under){
          //           ageal = true;
          //         }  else{
          //           ageal = false;
          //         }
          //       } else if(el.age_restriction =='Under')
          //       {
          //         if(self.userInfo.age < el.age_over_under){
          //           ageal = true;
          //         } else{
          //           ageal = false;
          //         }
          //       }  else{
          //         ageal = true;
          //       }
          //       el.ageallow = ageal;
          //     })
          // } 
          this.ClassData = response.data;
  
          this.instrustorData = response.data.instructor_details;
          //this.PassData = response.data.passes_details
          this.workshopStatus =response.data.workshop_status;
          this.CustomerDetail = response.data.customer_details;
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    
    } else {
      detail ={ "business_id":this.businessDetail.business_id,  "workshop_id":this.ID.id , 'schedule_id' :this.ID.schedule_id };
      url = 'superadmin/webservices/api/business_workshop_details';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          
            // Date Conversion UTC
            response.data.start_date_utc_new = this.global.dateConvert(response.data.schedule_date);
            response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date_utc);
                // time conversion
  
                response.data.from_time_new = this.global.timeConvert(response.data.start);
                response.data.to_time_new = this.global.timeConvert(response.data.end);
          
          //   if(response.data.customer_details.length != 0){
          //     response.data.customer_details.filter(function (el){
          //     // var birthyear = el.date_of_birth.split(' ');
          //     // var age = currYear - birthyear[birthyear.length-1];
          //     var birthyear = el.date_of_birth.split('-');
          //     var age = currYear - birthyear[0];
          //     el.age = age;
          //   })
          // }
              if(response.data.instructor_details.length != 0){
            var self = this, ageal;
            response.data.instructor_details.filter(function (el){
              el.from_time_new = self.global.timeConvert(el.from_time_utc);
              el.to_time_new = self.global.timeConvert(el.to_time_utc);
            })
          }
          // if(response.data.passes_details.length != 0){
          //   var self = this;
          //   response.data.passes_details.filter(function (el){
          //     el.start_date_utc_new = self.global.dateConvert(el.start_date_utc);
          //     el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
          //     if(el.age_restriction =='Over')
          //       {
          //         if(self.userInfo.age >= el.age_over_under){
          //           ageal = true;
          //         }  else{
          //           ageal = false;
          //         }
          //       } else if(el.age_restriction =='Under')
          //       {
          //         if(self.userInfo.age < el.age_over_under){
          //           ageal = true;
          //         } else{
          //           ageal = false;
          //         }
          //       }  else{
          //         ageal = true;
          //       }
          //       el.ageallow = ageal;
          //     })
          // } 
          this.ClassData = response.data;
  
          this.instrustorData = response.data.instructor_details;
          //this.PassData = response.data.passes_details
          this.workshopStatus =response.data.workshop_status;
          this.CustomerDetail = response.data.customer_details;
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    
    }
   }


  redirectUrl(id,url,urlcurrent){
    if(urlcurrent){     
      if(id.ageallow){
        var detail ={'id':id.pass_id ,'url':this.currentUrl};
        this.route.navigate([url],{state:{Id : detail}});  
      } else{
        this.global.dangerAlert('You are not eligible');
      }
    } else{
      this.route.navigate([url],{state:{Id : id}});
    }
  }

  redirectUrl1(id,url,urlcurrent){
    if(urlcurrent){    
        var detail ={'id':id.pass_id ,'url':this.currentUrl};
        this.route.navigate([url],{state:{Id : detail}});  
    } else{
      this.route.navigate([url],{state:{Id : id}});
    }
  }

  closeModal(){
    this.q1_answer = this.q2_answer = this.q3_answer = '';
    this.q4_answers =[] ; 
    this.q4_answer.filter(function (ell){
      ell.checked = false;
    })
  } 

  closed(){
    this.PurchasedPassData.filter(function (el){
        el.checked = false;
    });
  }

  makeActive(){
    setTimeout(()=>{
      var parent = document.querySelector('#purchasePassPopupSlide') as HTMLElement;
    parent.firstElementChild.classList.add('active');
    },500)
  }

  back(){
    if(this.View == 3 || this.View == 2){
      this.View = 1;
    }
    else{
      this.commonservice.back();
    }
  }

  getSaveCardDetail(){
    var detail= {"userid" :this.userInfo.id };
    var url = 'superadmin/webservices/api/cardGet' ;
    this.commonservice.PostApis(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.filter(function (el){
          el.checked = true;el.
          card_type = el.card_type.toLowerCase();
        })
        this.customerData = response.data;
      } else{
      }
    }))
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

  payment(status: any,details : any, response: any){   
    //let card = this.paymentCard;

    this.loading = true;
    if (status == 402) {
      this.loading = false;
      this.global.dangerAlert(response.error.message);
    } else {
      var detail,url;
      if(this.currentUrl == '/workshops-detail'){
        detail = {"grand_total": this.ClassData.workshop_total_price,"token": response.id ,'business_id': this.businessDetail.business_id,'workshop_id': this.ClassData.workshop_id,'workshop_schdule_id':this.ClassData.id,'tax':this.ClassData.workshop_tax_price,"savecard" : this.savecard,
        "number": details.number,"expiry_month": details.exp_month, "customer_name":this.paymentCard.value.card_holder_name,
        "expiry_year": details.exp_year,"cvd": details.cvc,"card_id":response.card.id,

        "country_code":""}
        //url = 'superadmin/webservices/api/buy_now_workshop';
        url = 'superadmin/webservices/api/clover_buy_now_workshop_single';
      }
      if(this.currentUrl == '/workshop-detail'){
        detail = {"grand_total": this.ClassData.workshop_total_price,"token": response.id ,'business_id': this.businessDetail.business_id,'workshop_id': this.ClassData.workshop_id,'workshop_schdule_id':this.ClassData.id,'customer_id':this.selectedClientInfo.id,'tax':this.ClassData.workshop_tax_price,"savecard" : 0,
        "number": details.number,"expiry_month": details.exp_month,  "customer_name":this.paymentCard.value.card_holder_name,
        "expiry_year": details.exp_year,"cvd": details.cvc, "card_id":response.card.id,

        "country_code":""}
      //url = 'superadmin/webservices/instructor/buy_now_workshop';
        url = 'superadmin/webservices/instructor/clover_buy_now_workshop_single';
      }
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.loading = false;
          this.submitted = false;
          this.paymentCard.reset();
          if(this.currentUrl == '/workshop-detail'){
            // this.global.successAlert(response.message);
            this.View = 1;
            this.instructorpayment = false;
            this.getWorkshopDetail();
          }        
          if(this.currentUrl == '/workshops-detail'){
            this.paymentval = false;
            this.route.navigate(['/my-workshop']); 
          }
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      })) 
  }
  }

  savePayment(card){
    this.loading = true;

    var detail = {
      "grand_total": this.ClassData.workshop_total_price,
      'workshop_id': this.ClassData.workshop_id,
      'workshop_schdule_id':this.ClassData.id,
      'tax':this.ClassData.workshop_tax_price,
      "token" : card.card_token,
      "savecard" : 0,
      // "number": card.number,
      // "expiry_month": card.expiry_month,
      // "expiry_year": card.expiry_year,
      // "cvd": card.cvv_no,
      // "customer_name":card.name,

      "business_id":this.businessDetail.business_id,
      "country_code":"",
    };
    //url = 'superadmin/webservices/api/buy_now_workshop';
    var url = 'superadmin/webservices/api/clover_buy_now_workshop_single';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.loading = false;
        this.submitted = false;
        //this.paymentCard.reset();
        // if(this.currentUrl == '/workshop-detail'){
        //   this.global.successAlert(response.message);
        //   this.View = 1;
        //   this.instructorpayment = false;
        //   this.getWorkshopDetail();
        // }        
        if(this.currentUrl == '/workshops-detail'){
          this.paymentval = false;
          this.route.navigate(['/my-workshop']); 
        }
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    })) 
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


  ClientList(){
    localStorage.setItem('sw_Instructor_Search_val',this.search_text);
    this.loading = true;
    var today = new Date();
    var currYear = today.getFullYear();
    var detail = { "pageid":"1", "business_id":this.businessDetail.business_id,'workshop_id':this.ID.id, "search_val":this.search_text}
    var url = 'superadmin/webservices/instructor/search_customer_for_workshop';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        var self =this;
        response.data.filter(function (el){
          el.age = self.global.ageCalculation(el.date_of_birth);
          // var birthyear = el.date_of_birth.split('-');
          // var age = currYear - birthyear[0];
          // el.age = age;
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

  booking(id){
    this.View = 3;
    this.selectedClientInfo = id;
  }

  getpaymentMode(event){
    var self= this;
    self.paymentMode = event.target.id;
  }

  PayAtStudio(){
    this.submitted = true;
    if(this.ReferenceDetail.valid){
      this.loading = true;
      var detail = {'business_id':this.businessDetail.business_id,'workshop_id':this.ID.id,'transaction_id':this.ReferenceDetail.value.referenceid,'payment_transaction_id':this.ReferenceDetail.value.payment_note,'amount':this.ClassData.workshop_total_price,'customer_id':this.selectedClientInfo.id,'tax':this.ClassData.workshop_tax_price
    //,'schedule_id':
  };
    var url ="superadmin/webservices/instructor/buy_now_workshop_cash";
    this.commonservice.PostApi(detail , url).subscribe(((response : any ) =>{
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.View = 1;
        this.instructorpayment = false;
        this.submitted = false;
        this.getWorkshopDetail();
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
    this.loading = false;   
    } else{
      this.loading = false;
      return false;
    }
  }

  Savecard(event){      
    if(event.target.checked == true){
      this.savecard = 1;
    }
    else{ this.savecard = 0}
  }

}


