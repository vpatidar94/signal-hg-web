import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-cart',
  templateUrl: './staff-cart.component.html',
  styleUrls: ['./staff-cart.component.scss']
})
export class StaffCartComponent implements OnInit {

  public loading : boolean = true;
  public submitted : any ;
  public userInfo : any;
  public businessDetail : any =[];
  public clientId : any ;
  public navData : any =[];
  public ID : any;
  public CartItem : any =[];
  public paymentMode : any;
  public cardType : any;
  public cardval : any;
  public customerData : any = [];
  public cardMethod : any ;
  public CardData : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) {
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));    
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.clientId = JSON.parse(localStorage.getItem('sw_Client_ID'));

    //this.navData =this.location.getState();
    // if(this.navData.Id){
    //   localStorage.setItem('sw_client', JSON.stringify(this.navData.Id));
    // }
    // if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
    //   if(localStorage.getItem('sw_classDetailId')){
    //     this.ID= JSON.parse(localStorage.getItem('sw_classDetailId'));
    //   }
    // } else {      
    //   if(localStorage.getItem('sw_classDetailId')){
    //     this.ID= JSON.parse(localStorage.getItem('sw_classDetailId'));
    //   }
    // } 

  }

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })
  get sf() { return this.savedCard.controls; }

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

  ngOnInit(): void {
    this.getcart();
    this.getSaveCardDetail()
  }


  PayAtStudio(){    
    var datadetail=[],businessid= this.businessDetail.business_id;
    this.CartItem.business_details.filter(function (ell){      
      ell.cart_details.filter(function (el){
        datadetail.push({"service_id":el.service_id,"service_type":el.service_type,"business_id":businessid,"quantity":el.quantity,"amount":el.amount, "tax": el.tax,'discount':el.discount})
      })
    });
    this.submitted = true;

    if(this.ReferenceDetail.valid){
      this.loading = true;

    var detail = {
      "client_id":this.clientId ,'reference_id':this.ReferenceDetail.value.referenceid,
      'payment_mode':this.cardval,
      'payment_note':this.ReferenceDetail.value.payment_note,
      "data":datadetail};
      var url = 'superadmin/webservices/instructor/pay_at_desk';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.ReferenceDetail.reset();
        this.submitted = false;
        this.loading = false;
        this.route.navigate(['/customer-detail']);
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

  getcart(){
    var url = 'superadmin/webservices/instructor/cart_list';
    var detail={"pageid" : "1", "client_id" : this.clientId, "business_id" : this.businessDetail.business_id    };
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.CartItem = response.data;
        this.loading = false;
      } else{
        this.CartItem = [];
        this.loading = false;
        this.route.navigate(['/customer-detail']);
      }
    }))
  }

  updateCartDetail(data){
    var url = 'superadmin/webservices/instructor/update_cart';
    var detail = { "client_id" : this.clientId, "product_id":data.service_id, "business_id" : this.businessDetail.business_id,  "cart_id":data.cart_id,    "quantity":data.quantity,'discount':data.discount };
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1) {
        this.global.successAlert(response.message);
        this.getcart();
      } else{
        this.global.dangerAlert(response.message);
        this.getcart();
      }
    }))
  }

  updateCount(value,data){ 
    this.loading = true;
    if(value == '+'){
        data.quantity = parseInt(data.quantity) + 1;
        this.updateCartDetail(data);
    } else{
      if(data.quantity > 1){
        data.quantity = parseInt(data.quantity) - 1;
        this.updateCartDetail(data);
    } else{
     this.RemoveCartDetail(data);
      this.loading = false;
      return false;

    }
   }
  }

  RemoveCartDetail(data){
    this.loading= true;
    var url = 'superadmin/webservices/instructor/remove_cart';
    var detail = {"client_id" : this.clientId,"remove_cart_type" :'0', "cart_id" :data.cart_id ,"business_id" : this.businessDetail.business_id }
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status ==1){
        this.global.successAlert(response.message);
        this.getcart();
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
  }

  getSaveCardDetail(){
    var detail= {"userid" :this.clientId };
    var url = 'superadmin/webservices/api/cardGet' ;
    this.commonservice.PostApis(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.filter(function (el){
          el.checked = false;
          el.card_type = el.card_type.toLowerCase();
        })
        this.customerData = response.data;
      } else{
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

  getpaymentMode(event){
    var self= this;
    self.paymentMode = event.target.id;
    self.cardval = event.target.value
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
      var datadetail=[],businessid= this.businessDetail.business_id;
      this.CartItem.business_details.filter(function (ell){      
        ell.cart_details.filter(function (el){
          datadetail.push({"service_id":el.service_id,"service_type":el.service_type,"business_id":businessid,"quantity":el.quantity,"amount":el.amount, "tax": el.tax,'discount':el.discount})
        })
      });
      var url = 'superadmin/web/studio/clover_pay_checkout_single';      
      var detail = { "client_id":this.clientId ,"token":response.id,"savecard":"0","card_id":response.card.id,"data": datadetail,
      "number": details.number,
      "expiry_month": details.exp_month,
      "expiry_year": details.exp_year,
      "cvd": details.cvc,
      "business_id":this.CartItem.business_details[0].business_id,
      "country_code":"",
      // "customer_name":this.paymentCard.value.card_holder_name,
    }
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.global.successAlert(response.message);
          this.loading = false;
          this.submitted = false;
          this.paymentCard.reset();
          this.route.navigate(['/customer-detail']);
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      })) 
    }
  }

  getcardMode($event){

  }
}
