import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-product-purchase',
  templateUrl: './product-purchase.component.html',
  styleUrls: ['./product-purchase.component.scss']
})
export class ProductPurchaseComponent implements OnInit {

  public navData : any =[];
  public ProductDetail : any =[];
  public paymentval: boolean ;
  public ProductCount: any = 1;
  public ProductAmount : any;
  public ProductTax : any =0;
  public ProductTotalAmount : any;
  public businessDetail : any =[];
  public loading : boolean = false;
  public submitted : any ;
  public userInfo : any;
  public savecard : any = 0 ;
  public cardType : any;
  public CardData : any = [];
  public customerData : any = [];
  public cardTypevalue : boolean;


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.getSaveCardDetail();

    this.navData =this.location.getState();
    if(this.navData.Detail){
      localStorage.setItem('sw_ProductDetail', JSON.stringify(this.navData.Detail));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_ProductDetail')){
        this.ProductDetail= JSON.parse(localStorage.getItem('sw_ProductDetail'));
      }
    } else {      
      if(localStorage.getItem('sw_ProductDetail')){
        this.ProductDetail= JSON.parse(localStorage.getItem('sw_ProductDetail'));
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
  get f() { return this.paymentCard.controls; }

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })
  get sf() { return this.savedCard.controls; }


  ngOnInit(): void {
    this.getAmountTax();
  }

  redirectUrl(url,Id){
    this.route.navigate([url],{state:{Id : Id}});
  }

  updateCount(value,data){
    if(value == '+'){
      if(this.ProductCount < this.ProductDetail.product_quantity){
        data.quantity = this.ProductCount = this.ProductCount+1;
        this.updateCartDetail(data);
        //this.getAmountTax();
      } else{
        this.global.dangerAlert('Product Not available');
        return false;
      }
    } else{
      if(this.ProductCount > 1){
        data.quantity = this.ProductCount = this.ProductCount -1;
        this.updateCartDetail(data);
        //this.getAmountTax();
      } else{
        this.global.dangerAlert('Minimum Quantity is 1')
        return false;
      }
    }
  }

  updateCartDetail(data){
    var detail = {  "cart_id":"",    "quantity":data.quantity ,"product_id" : data.product_id };
    var url = 'superadmin/webservices/api/update_cart';
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1) {
        this.global.successAlert(response.message);
        this.ProductDetail.product_price = response.data.total_amount;
        this.ProductDetail.product_tax_price = response.data.tax;
        this.ProductDetail.product_total_price = response.data.grand_total;
        //this.getCartDetail();
      } else{
        this.global.dangerAlert(response.message);
        //this.getCartDetail();
      }
    }))
  }

  getAmountTax(){
    this.ProductAmount = this.ProductCount * this.ProductDetail.product_price ;
    this.ProductTax = (this.ProductDetail.tax1_rate *this.ProductAmount /100) + (this.ProductDetail.tax2_rate *this.ProductAmount /100)
    this.ProductTotalAmount = this.ProductAmount+this.ProductTax;
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
    this.loading = true; 
      var detail = {
        "service_type":"3",
        "service_id":this.ProductDetail.product_id,
        "quantity":this.ProductCount,
        "grand_total":this.ProductTotalAmount,
        "slot_date":"",
        "slot_time_id":"",
        "token": response.id ,
        "savecard": this.savecard,
        "card_id" : response.card.id,
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
          this.route.navigate(['/product']);
        } else{
          this.global.dangerAlert(response.message);
          this.loading = false;
        }
      }))
    } 
  }
  
  getSaveCardDetail(){
    var detail= {"userid" :this.userInfo.id };
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
      "service_type":"3",
      "service_id":this.ProductDetail.product_id,
      "quantity":this.ProductCount,
      "slot_date":"",
      "slot_time_id":"",
      "business_id": this.businessDetail.business_id,
      "amount": this.ProductAmount,
      "tax": this.ProductTax,
      "instructor_id": ""
    };
    var url = 'superadmin/webservices/api/pay_at_desk';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){ 
        this.global.successAlert(response.message);
        this.loading = false ;
       // this.route.navigate(['/product']);
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }))

  }
}
