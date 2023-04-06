import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-pass-details',
  templateUrl: './pass-details.component.html',
  styleUrls: ['./pass-details.component.scss']
})
export class PassDetailsComponent implements OnInit {

  public businessDetail : any =[];
  public passId: any;
  public loading : boolean = true;
  public submitted : any ;
  public navData : any =[];
  public passDetail : any =[];
  public paymentval: boolean ;
  public PassCount: any = 1;
  public PassAmount : any ;
  public PassTax : any = 0;
  public PassTotalAmount : any ;
  public paynow : boolean ;
  public backurl : any;
  public userInfo : any =[];
  public savecard : any = 0 ;
  public cardType : any;
  public CardData : any = [];
  public customerData : any = [];
  public cardTypevalue : boolean;
  public addresslength : any;
  public businessId : any;


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData = this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_PassId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_PassId')){
        var passdetail = JSON.parse(localStorage.getItem('sw_PassId'));
        this.passId = passdetail.id;
        this.backurl = passdetail.url;
        if(this.backurl == '/my-purchase'){ 
          this.businessId = passdetail.businessId;  }  
        }
      
    } else {      
      if(localStorage.getItem('sw_PassId')){
        var passdetail = JSON.parse(localStorage.getItem('sw_PassId'));
        this.passId = passdetail.id;
        this.backurl = passdetail.url;  
        if(this.backurl == '/my-purchase'){ 
        this.businessId = passdetail.businessId;  }  
      }
    } 
   }


  ngOnInit(): void {
    this.getPassInfo();
    // if(this.backurl == '/my-purchase'){
    //   this.getPurchsedPassInfo();
    // } else{    
    //   this.getPassInfo();
    // }
  }

  getAmountTax(){
    this.PassAmount = this.passDetail.amount ;
    // if(this.backurl == '/my-purchase'){ 
    //   this.PassTax = 0;
    //   this.PassTotalAmount = this.PassAmount;
    // }
    // else{
      this.PassTax = this.passDetail.tax;
      this.PassTotalAmount = this.PassAmount+this.PassTax;

    //}
  }

  getPassInfo(){
    var detail = { "pass_id":this.passId};
    var url = 'superadmin/webservices/api/passes_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.start_date_utc_new = this.global.dateConvert(response.data.start_date_utc);
        this.passDetail = response.data;
        //this.getAmountTax();
        this.getBusinessDetail();
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))

  }

  getPurchsedPassInfo(){
    var detail = { "business_id":this.businessId, "purchase_status":"1", "service_id":this.passId};
    var url = 'superadmin/webservices/api/my_purchase_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.start_date_utc_new = this.global.dateConvert(response.data.start_date);
        response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date);
        this.passDetail = response.data;
        //this.getAmountTax();
        this.getBusinessDetail();
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
       this.getPassInfo();
     } else{
       this.global.dangerAlert(response.message);   
       this.loading = false; 
     }
    }))
  }

  redirect(){
    this.route.navigate([this.backurl]);
  }

  
  getBusinessDetail(){
    var detail ={ "business_id":this.passDetail.business_id};
    var url = 'superadmin/webservices/api/get_business_detail' ;
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
       this.businessDetail = response.data;
       this.addresslength = this.businessDetail.address.length;
       var detail = {"business_id":response.data.business_id,'business_name':response.data.business_name, 'address':response.data.address,'logo':response.data.logo,'business_img':response.data.business_img,'email':response.data.email,'latitude':response.data.latitude,'longitude':response.data.longitude,'business_phone':response.data.business_phone,'favourite':response.data.favourite,'video_access':response.data.video_access};
       localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(detail));
       this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }
  
  Back(){
    this.route.navigate([this.backurl]);
   
  }
}

