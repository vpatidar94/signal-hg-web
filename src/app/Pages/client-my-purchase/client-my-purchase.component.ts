import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-client-my-purchase',
  templateUrl: './client-my-purchase.component.html',
  styleUrls: ['./client-my-purchase.component.scss']
})
export class ClientMyPurchaseComponent implements OnInit {

  public businessDetail : any =[];
  public ProductDetail : any = [];
  public attandanceDetail : any = [];
  public loading : boolean = true;
  public PassDetail : any =[]; 
  public ServiceDetail : any =[]; 
  public purchaseDetail : any = [];
  public userDetail : any =[];
  public navData : any =[];
  public ID : any;
  public activePassDetail : any = [];
  public expirePassDetail : any = [];
  public pagecount : any = 1;
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public currentStatus : any = '';
  public dataCount : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) { 
    this.userDetail= JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.puchaseList(this.currentStatus,this.pagecount);
  }

  ngOnInit(): void {
  }

 
  puchaseList(status,count){
    var detail;
    this.currentStatus = status;
    this.loading = true;
    if(status == ''){
       detail ={"pageid":count,  "business_id":this.businessDetail.business_id};
    } else{
      detail ={"pageid":count,  "business_id":this.businessDetail.business_id,"purchase_status":status};
    }
    var url = 'superadmin/webservices/api/my_purchase_list' ;
    this.commonservice.PostApi(detail,url).subscribe(((response :any) =>{
      if(response.status == 1){
        if(status == '3'){
          if(response.data.length !=0){ 
            var self= this;
            response.data.filter(function(el){
            el.purchase_date_new = self.global.dateConvert(el.shift_date);
            el.start_time_new = self.global.timeConvert(el.start_time);
            el.end_time_new = self.global.timeConvert(el.end_time);
            el.Name = el.name +' '+ el.lastname;
            if(el.family_user_id != 0){             
              el.Name = el.family_member_name ;
            }
        })
      }
      if(this.pagecount == 1){
        this.ServiceDetail = response.data;
      } else {
        this.ServiceDetail =this.ServiceDetail.concat(response.data);
      }
         // this.ServiceDetail = response.data;
        }
        else if(status == '1'){
          if(response.data.length !=0){ var self= this;
            self.activePassDetail = []; self.expirePassDetail = [];
            response.data.filter(function(el){
              el.start_date_new = self.global.dateConvert(el.start_date);
              el.end_date_new = self.global.dateConvert(el.end_date);
              if(el.pass_status_text == 'Active'){
                self.activePassDetail.push(el);
              } else{
                self.expirePassDetail.push(el);
              }
            })
          }
          if(this.pagecount == 1){
            this.PassDetail = response.data;
          } else {
            this.PassDetail = this.PassDetail.concat(response.data);
            this.activePassDetail = [];
            this.expirePassDetail = [];
            var self =this;
            this.PassDetail.filter(function(el){
              if(el.pass_status_text == 'Active'){
                self.activePassDetail.push(el);
              } else{
                self.expirePassDetail.push(el);
              }
            })

          }
          // this.PassDetail = response.data;
        }
        else if(status == '2'){
          if(response.data.length !=0){ var self= this;
            response.data.filter(function(el){
            el.purchase_date_new = self.global.dateConvert(el.purchase_date);
        })
      }
      if(this.pagecount == 1){
        this.ProductDetail = response.data;
      } else {
        this.ProductDetail =this.ProductDetail.concat(response.data);
      }
        //  this.ProductDetail = response.data;
        } else{
          if(response.data.length !=0){ var self= this;
              response.data.filter(function(el){
                if(el.pass_id){
                  el.start_date_new = self.global.dateConvert(el.start_date);
                  el.end_date_new = self.global.dateConvert(el.end_date);
                }
                if(el.product_id){
                  el.purchase_date_new = self.global.dateConvert(el.purchase_date);
                }
                if(el.service_id){
                  el.purchase_date_new = self.global.dateConvert(el.shift_date);
                  el.start_time_new = self.global.timeConvert(el.start_time);
                  el.end_time_new = self.global.timeConvert(el.end_time);
                  el.Name = el.name +' '+ el.lastname;
            if(el.family_user_id != 0){             
              el.Name = el.family_member_name ;
            }
                }
              })
            }
            if(this.pagecount == 1){
              this.purchaseDetail = response.data;
            } else {
              this.purchaseDetail =this.purchaseDetail.concat(response.data);
            }
         // this.purchaseDetail = response.data;
        }
        this.loading = false;
      } else{
        this.dataCount = 0;
        if(this.pagecount == 1){
          if(status == 3){
            this.ServiceDetail = [];
          }
          if(status == 1){
            this.PassDetail = [];
            this.activePassDetail = [];
            this.expirePassDetail = [];
          }
          if(status == 2){
            this.ProductDetail = [];
          } 
          if(status == ''){
            this.purchaseDetail = [];
          }
        }
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
        this.puchaseList(1,1);
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
  }

  reset(){
    this.route.navigate(['/studio-detail']);
  }

  redirectUrl(id,booking_id,url,status){
    if(status == 'Expired'){
      Swal.fire({
        // title:'Replace cart item?',
        text: 'Would you like to purchase this pass again.',
        // icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.value) {
          var detail ={'id':id ,'url':'/my-purchase', 'businessId':this.businessDetail.business_id,'user_booking_id':booking_id};
          this.route.navigate([url],{state:{Id : detail}});   
          // Swal.fire(
          //   'Cart Added Successfully',
          //   'success'
          // )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Swal.fire(
          //   'Cancelled',
          //   'Cart not updated',
          //   'error'
          // )
        }
      })
      //this.global.dangerAlert('Please clear privos cart data');
    } else{
      var detail ={'id':id ,'url':'/my-purchase', 'businessId':this.businessDetail.business_id,'user_booking_id':booking_id};
      this.route.navigate([url],{state:{Id : detail}});   
    }
  }

  redirectUrl1(businessId,url){
    // var detail ={'id':businessId ,'url':url};
    this.route.navigate([url],{state:{Id : businessId}});   
}

//onScroll function for scroll listing..of the event,...
onScroll() {
  if(this.dataCount !=0 ) {
    if(this.currentStatus == 1){
      if(this.PassDetail.length == 10){
        this.pagecount++;
        this.puchaseList(this.currentStatus,this.pagecount);    
      }
    } else if(this.currentStatus == 2){
      if(this.ProductDetail.length == 10){
        this.pagecount++;
        this.puchaseList(this.currentStatus,this.pagecount);    
      }
    } else if(this.currentStatus == 3){
      if(this.ServiceDetail.length == 10){
        this.pagecount++;
        this.puchaseList(this.currentStatus,this.pagecount);    
      }
    } else {
      if(this.purchaseDetail.length == 10){
        this.pagecount++;
        this.puchaseList(this.currentStatus,this.pagecount);    
      }
    }
  }
}
}
