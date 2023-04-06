import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public navData : any =[];
  public CartItem : any =[];
  public paymentval: boolean ;
  public CartCount: any = 1;
  public CartAmount : any;
  public CartTax : any =0;
  public CartTotalAmount : any;
  public loading : boolean = true;
  public submitted : any ;
  public userInfo : any;
  public savecard : any = 0 ;
  public cardType : any;
  public CardData : any;
  public customerData : any = [];
  public cardTypevalue : boolean;
  
  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));    
    this.getSaveCardDetail();
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

  savedCard = new FormGroup({
    cvv_no: new FormControl('',Validators.compose([
      Validators.required
    ]))
  })
  get sf() { return this.savedCard.controls; }

    ngOnInit(): void {
      this.getCartDetail();
      //this.generateToken();
    }
  
  
  // convenience getter for easy access to form fields


  
    redirectUrl(url,Id){
      this.route.navigate([url],{state:{Id : Id}});
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
        // this.loading = false;
        return false;
      }
     }
    }
  
    getCartDetail(){
      var detail ={    "pageid":"1"};
      var url = 'superadmin/webservices/api/cart_list';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          this.CartItem = response.data;          
          localStorage.setItem('sw_CartValues',<any> JSON.stringify(response.data.total_item));
          this.commonservice.setSubject(response.data.total_item);
          this.loading = false;
        } else{
          this.CartItem = [];
          var m ="";
          localStorage.setItem('sw_CartValues',<any> JSON.stringify(m));
          this.commonservice.setSubject(m);
          this.loading = false;
        }
      }))
  
    }
  
    updateCartDetail(data){
      var detail = {  "cart_id":data.cart_id,    "quantity":data.quantity };
      var url = 'superadmin/webservices/api/update_cart';
      this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
        if(response.status == 1) {
          this.global.successAlert(response.message);
          this.getCartDetail();
        } else{
          this.global.dangerAlert(response.message);
          this.getCartDetail();
        }
      }))
    }
  
    RemoveCartDetail(data){
      this.loading = true;
      var detail ={ "remove_cart_type":"0",    "cart_id":data.cart_id};
      var url = 'superadmin/webservices/api/remove_cart';
      this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
        if(response.status == 1) {
          this.global.successAlert(response.message);
          this.getCartDetail();
        } else{
          this.global.dangerAlert(response.message);
        }
      }))
    }
  
    payment(status: any,details : any, response: any) {
        if (status == 402) {
          this.loading = false;
          this.global.dangerAlert(response.error.message);
        } else {
        var detail = {
          "amount" :this.CartItem.grand_total,   
          "token" : response.id,
          "savecard" : this.savecard,
          "card_id" : response.card.id,
          "number": details.number,
          "expiry_month": details.exp_month,
          "expiry_year": details.exp_year,
          "cvd": details.cvc,  
          "business_id":this.CartItem.business_details[0].business_id,
          "country_code":"",
        };
        var url = 'superadmin/webservices/api/clover_pay_checkout_single';        
        this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
          if(response.status == 1){
            this.global.successAlert(response.message);
            this.loading = false;
            this.submitted = false;
            this.paymentCard.reset();
            this.getCartDetail();
            this.route.navigate(['/home']);
            this.paymentval = false;
          } else{
            this.global.dangerAlert(response.message);
            this.loading = false;
          }
        }))
    }
    }

    generateToken(type){
      this.submitted = true;
        let detail,record;
        if(type == 1){
          if (this.paymentCard.valid) {
          var expired = this.global.ExpiryCheck(this.paymentCard.value.expiry);
          if(expired)  {
            this.paymentCard.value.expiry_month = expired[0];
            this.paymentCard.value.expiry_year = expired[1];
            record =this.paymentCard;
          }  else{
            return false;
          }
        } else{
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
  
  }
  
  
  
  
  
