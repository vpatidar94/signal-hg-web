import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2'
declare var $;

@Component({
  selector: 'app-pass-detail',
  templateUrl: './pass-detail.component.html',
  styleUrls: ['./pass-detail.component.scss']
})
export class PassDetailComponent implements OnInit {
   
  public businessDetail : any =[];
  public passId: any;
  public loading : boolean = true;
  public submitted : any ;
  public navData : any =[];
  public passDetail : any =[];
  public paymentval: boolean ;
  public PassCount: any = 1;
  public PassAmount : any ;
  public PassTax : any ;
  public PassTotalAmount : any ;
  public paynow : boolean ;
  public userInfo : any =[];
  public savecard : any = 0 ;
  public cardType : any;
  public CardData : any ;
  public customerData : any = [];
  public cardTypevalue : boolean;
  public CartData: any = [];
  public policy_detail : any = [];
  public termsData : any ;
  public booking_id : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.getSaveCardDetail();
    this.navData = this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_PassId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_PassId')){
        var passdetail = JSON.parse(localStorage.getItem('sw_PassId'));
        this.passId = passdetail.id;
        this.booking_id = passdetail.user_booking_id;
      }
    } else {      
      if(localStorage.getItem('sw_PassId')){
        var passdetail = JSON.parse(localStorage.getItem('sw_PassId'));
        this.passId = passdetail.id;
        this.booking_id = passdetail.user_booking_id;
      }
    } 
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
      Validators.required
    ]))
  })

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })

  ngOnInit(): void { 
    this.getCartDetail();
    this.getPassInfo();
    this.getContent();
   
  }

// convenience getter for easy access to form fields
  get f() { return this.paymentCard.controls; }

  get sf() { return this.savedCard.controls; }

  redirectUrl(url,Id){
    this.route.navigate([url],{state:{Id : Id}});
  }

  updateCount(value){
    if(value == '+'){
      if(this.PassCount < this.passDetail.product_quantity){
        this.PassCount = this.PassCount+1;
      } else{
        this.global.dangerAlert('Pass not Available');
        return false;
      }
    } else{
      if(this.PassCount > 1){
        this.PassCount = this.PassCount -1;
      } else{
        this.global.dangerAlert('Minimun Quantity is 1')
        return false;
      }
    }
  }

  getAmountTax(){
    this.PassAmount = this.passDetail.amount ;
    this.PassTax = this.passDetail.tax;
    this.PassTotalAmount = this.PassAmount+this.PassTax;
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
    this.loading = true;
    if (status == 402) {
      this.loading = false;
      this.global.dangerAlert(response.error.message);
    } else {
      var detail = {
        "service_type":'1',
        "service_id":this.passDetail.pass_id,
        "quantity":1,
        "grand_total":this.passDetail.pass_total_price,
        "slot_date":"",
        "slot_time_id":"",
        "token": response.id ,
        "savecard": this.savecard,
        "card_id": response.card.id,
        "business_id":this.businessDetail.business_id,
        "number": details.number,
        "expiry_month": details.exp_month,
        "expiry_year": details.exp_year,
        "cvd": details.cvc,
        "country_code":"",
        // "customer_name":this.paymentCard.value.card_holder_name,
      };
      var url = 'superadmin/webservices/api/clover_buy_now_single';    
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.loading = false;
          this.submitted = false;
          this.paymentCard.reset();
          this.commonservice.back();
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      })) 
  }
  }

  getPassInfo(){
    var detail = { "pass_id":this.passId ,'user_booking_id':this.booking_id};
    var url = 'superadmin/webservices/api/passes_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.start_date_utc_new = this.global.dateConvert(response.data.start_date_utc);
        this.passDetail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))

  }

  addFav(id,status){
    this.loading = true;
    var detail ={  "service_type":"2",   "service_id":id,   "status":status};
    var url = 'superadmin/webservices/api/favourite';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
     if(response.status == 1){
       this.global.successAlert(response.message);
       this.getPassInfo();
     } else{
       this.global.dangerAlert(response.message);   
       this.loading = false; 
     }
    }))
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

  Savecard(event){      
    if(event.target.checked == true){
      this.savecard = 1;
    }
    else{ this.savecard = 0}
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

  PayAtStudio(){
    var detail = {
      "service_type":'1',
      "service_id":this.passDetail.pass_id,
      "quantity":1,
      "slot_date":"",
      "slot_time_id":"", 
      "business_id": this.businessDetail.business_id,
      "amount": this.PassAmount,
      "tax": this.PassTax,
      "instructor_id": ""
    };
    var url = 'superadmin/webservices/api/pay_at_desk';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.loading = false;
        this.commonservice.back();
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }))

  }


  AddCart(Detail){
    if(this.CartData.length != 0){
        if(this.businessDetail.business_id == this.CartData.business_id){
          this.AddCartData(Detail);
      } else {
        Swal.fire({
          title:'Replace cart item?',
          text: 'Your cart contains items from another studio. Do you want to discard the selection and add pass from new studio?.',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'No',
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.value) {
            this.RemoveCartDetail(Detail);
            // Swal.fire(
            //   'Cart Added Successfully',
            //   'success'
            // )
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
          }
        })
      }
    } else {
      this.AddCartData(Detail);
    }
  }

  AddCartData(Detail){
    this.loading = true;
    var url = 'superadmin/webservices/api/add_cart';
    var detail ={  "service_type":"1",    "service_id":Detail.pass_id,    "amount":Detail.amount,    "quantity":"1"};
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.loading = false;
        this.getCartDetail(); this.getPassInfo();
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;

      }
    }))
  }

  getCartDetail(){
    var detail ={    "pageid":"1"};
    var url = 'superadmin/webservices/api/cart_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){      
        localStorage.setItem('sw_CartValues',<any> JSON.stringify(response.data.total_item));
        this.commonservice.setSubject(response.data.total_item);
        this.CartData = response.data.business_details[0];
      } else{
      }
    }))

  }

  RemoveCartDetail(data){
    this.loading = true;
    var detail ={ "remove_cart_type":"1" };
    var url = 'superadmin/webservices/api/remove_cart';
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1) {
        this.AddCartData(data);
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
  }

  Terms(event){      
    if(event.target.checked == true){
      this.termsData = 1;
    }
    else{ this.termsData = 0}
  }

  getContent(){
    var detail = "superadmin/Welcome/web_content/term-and-condition-recurring-pass";
    this.commonservice.GetApi(detail).subscribe((( response : any) => {
      this.policy_detail = response.content;    
    }))
  }

  passCheck(){
    if(this.passDetail.is_recring == 1 ){
      if(this.termsData == 1){
        this.paymentval = true
      } else {
        return false;
      }
    } else{
      this.paymentval = true
    }
  }
}
