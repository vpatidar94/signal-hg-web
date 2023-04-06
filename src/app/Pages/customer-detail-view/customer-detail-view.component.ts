import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router"; 
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  

@Component({
  selector: 'app-customer-detail-view',
  templateUrl: './customer-detail-view.component.html',
  styleUrls: ['./customer-detail-view.component.scss']
})
export class CustomerDetailViewComponent implements OnInit {

  public loading : boolean = false;
  public ProfileDetail : any =[];
  public ProductDetail : any =[];
  public PassDetail : any =[];
  public AvailableProductDetail : any =[];
  public AvailablePassDetail : any =[];
  public businessDetail : any =[];
  public purchaseItemDetail : any =[];
  public availableItemDetail : any =[];
  public navData : any =[];
  public ID : any;
  public cartval :any;
  public classData : any =[];
  imgURL: any;

  public PurchasePassDetail_Options: OwlOptions = {
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
        items: 2,
        loop: true,
      },     
      1000: {
        items: 2,
        loop: true,
      },     
      1280: {
        items: 3,
        loop: true,
      }
    },
  }
  public PurchaseProductDetail_Options: OwlOptions = {
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
        items: 3,
        loop: true,
      },     
      1000: {
        items: 3,
        loop: true,
      },     
      1280: {
        items: 4,
        loop: true,
      }
    },
  }

  public AvailablePassDetail_Options: OwlOptions = {
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
        items: 2,
        loop: true,
      },     
      1000: {
        items: 2,
        loop: true,
      },     
      1280: {
        items: 3,
        loop: true,
      },  

    },
  }
  public AvailableProductDetail_Options: OwlOptions = {
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
        items: 3,
        loop: true,
      },     
      1000: {
        items: 3,
        loop: true,
      },     
      1280: {
        items: 4,
        loop: true,
      },  

    },
  }

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService,  private location :Location) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.classData = JSON.parse(localStorage.getItem('sw_classDetailId'));
    var cccc = this.route.url; 
    localStorage.setItem('sw_previous_url',cccc);
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_Client_ID', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_Client_ID')){
        this.ID= JSON.parse(localStorage.getItem('sw_Client_ID'));
      }
    } else {      
      if(localStorage.getItem('sw_Client_ID')){
        this.ID= JSON.parse(localStorage.getItem('sw_Client_ID'));
      }
    } 
  }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){ var available=[],purchse=[];
    this.loading = true;
    var url = 'superadmin/webservices/instructor/search_customer_details';
    var detail = {"business_id":this.businessDetail.business_id ,'client_id':this.ID,'class_id':this.classData.id};
    this.commonservice.PostApi(detail,url).subscribe((( response : any) => {
      if(response.status == 1 ){
         if(response.data.purchase_passes_data){ 
          if(response.data.purchase_passes_data.length != 0){
            var self = this;
            response.data.purchase_passes_data.filter(function (el){
              el.start_date_utc_new = self.global.dateConvert(el.start_date);
              el.end_date_utc_new = self.global.dateConvert(el.end_date);
            })}       
          this.PassDetail = response.data.purchase_passes_data;
         }
         if(response.data.purchase_product_data){
          this.ProductDetail = response.data.purchase_product_data;
         }
         if(response.data.avaliable_passes_data){ 
          if(response.data.avaliable_passes_data.length != 0){
            var self = this;
            response.data.avaliable_passes_data.filter(function (el){
              el.start_date_utc_new = self.global.dateConvert(el.purchase_start_date);
              el.end_date_utc_new = self.global.dateConvert(el.end_date);
            } )}       
          this.AvailablePassDetail=response.data.avaliable_passes_data;
        }
         if(response.data.avaliable_product_data){
          this.AvailableProductDetail=response.data.avaliable_product_data;
         }

        this.ProfileDetail = response.data;
        this.ProfileDetail.mobile1 = this.ProfileDetail.country_code +'  ' + this.ProfileDetail.mobile;   
        
        this.AvailableProductDetail.filter(function (el){
          available.push(el);
        })

        this.AvailablePassDetail.filter(function (el){
          available.push(el);
        })

        this.PassDetail.filter(function (el){
          purchse.push(el);
        })

        this.ProductDetail.filter(function (el){
          purchse.push(el);
        })

        this.availableItemDetail = available;    
        this.purchaseItemDetail= purchse;

        this.cartval = response.data.total_item;
        //this.getcart();
        this.loading = false;

      }else{
        this.loading = false;

      }
      
    }))
  }

  AddToCart(type,item){
    this.loading = true;
    var amount;
    if(type== 1){
      amount = item.amount;
    } else{
      amount = item.price;
    }
    var url = 'superadmin/webservices/instructor/add_cart';
    var detail={"service_type" : type, "service_id" : item.id, "amount": amount, "quantity" : "1", 
    "client_id" : this.ProfileDetail.id, "business_id" :this.businessDetail.business_id  };
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getDetail();
        this.loading = false;      
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
      }

    })) 
  }

  getcart(){
    var url = 'superadmin/webservices/instructor/cart_list';
    var detail={"pageid" : "1", "client_id" : this.ProfileDetail.id, "business_id" : this.businessDetail.business_id    };
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.cartval = response.data.total_item;
      } else{

      }
    }))
  }

  redirectUrl(url,Id){
    if(url =='/pass-detail'){
      var detail ={'id':Id.id,'url':'/customer-detail','user_booking_id':Id.user_booking_id}
      this.route.navigate([url],{state:{Id : detail}});
    } else{
      this.route.navigate([url],{state:{Id : Id}});

    }
  }
}
