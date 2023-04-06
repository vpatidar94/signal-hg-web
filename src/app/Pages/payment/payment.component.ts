import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public loading : boolean = true;
  public businessDetail : any =[];
  public userInfo : any =[];
  public savecard : any = 0 ;
  public cardType : any;
  public CardData : any;
  public customerData : any = [];
  public cardTypevalue : boolean;
  public submitted : any ;
 
  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));  }

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

  ngOnInit(): void {
    this.getSaveCardDetail();
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
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  closed(){
    this.paymentCard.reset();
    this.cardType ='';
    this.submitted = false;
  }

  savecardDetail(){
    this.submitted = true;
    var detail ={ 
      "userid" : this.userInfo.id,
      "name" : this.paymentCard.value.card_holder_name,
      "card_token" : this.paymentCard.value.token,
      "number" : this.paymentCard.value.card_number,
      "expiry_month" : this.paymentCard.value.expiry_month,
      "expiry_year" : this.paymentCard.value.expiry_year,
      "cvv" : this.paymentCard.value.cvv_no,
      "business_id" : this.businessDetail.business_id,
      "country_code" : ""
    };
    // var url = 'superadmin/webservices/api/cardSave';
    var url = 'superadmin/webservices/api/clover_card_save';
    this.commonservice.PostApis(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.paymentCard.reset();
        this.cardType ='';
        this.submitted = false;
        this.getSaveCardDetail();
      } else{
        this.global.dangerAlert(response.message);
        
      }
    }))
  }

  deletecardDetail(cardid){
    this.loading = true;
    var detail ={  "id" : this.customerData[0].customer_code,    "card_id" :cardid,};
    var url ='superadmin/webservices/api/cardDelete';
    this.commonservice.PostApis(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getSaveCardDetail();
      } else{
        this.global.dangerAlert(response.message);
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
  
  payment(){
    var today = new Date();
    var currYear = today.getFullYear();
    var month =  today.getMonth() + 1;
    var newmonth;
    if(month < 10){
      newmonth = '0'+ month;
    }      
    var expired = this.paymentCard.value.expiry.split('/');

    if((expired[0] < newmonth && expired[1] <=  currYear )||  expired[1] <  currYear) {
      this.loading = false;
      this.global.dangerAlert('Expiry Month & Year is not valid')
      return false;
    }
    this.paymentCard.value.expiry_month =expired[0];
    this.paymentCard.value.expiry_year =expired[1];
    this.submitted = true;
    let card = this.paymentCard;
    if(card.valid){
      this.loading = true;       
      var detail = { "number": this.paymentCard.value.card_number,"expiry_month": this.paymentCard.value.expiry_month,
        "expiry_year": this.paymentCard.value.expiry_year,"cvd": this.paymentCard.value.cvv_no,
        "business_id":this.businessDetail.business_id,
        "country_code":""

      };
      var url = 'superadmin/webservices/api/get_clover_payment_token';
      this.commonservice.PostApis(detail,url).subscribe(((response : any ) =>{
        if(response.status == 1){
          this.paymentCard.value.token = response.data.token;
          this.savecardDetail();
          this.loading = false;    
        }
        }))
  } else{
    this.loading = false;
    return false;
  }
  }

}
