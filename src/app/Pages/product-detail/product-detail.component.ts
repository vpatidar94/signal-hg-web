import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2'
declare var $;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

 // @ViewChild('slickModal', { static: true }) slickModal: SlickCarouselComponent;

  public navData : any =[];
  public ID : any;
  public ProductDetail : any =[];
  public similarProductDetail : any =[];
  public businessDetail : any =[];
  public loading : boolean = true;
  public ProductImages : any = [];
  public CartData: any = [];

  public Similar_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    dots:false,
    nav:true, 
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    mouseDrag: true, 
    responsive: {  
      0: {
        items: 3,
        loop: true,
      },
      400: {
        items: 3,
        loop: true,
      },
      740: {
        items: 3,
        loop: true,
      },     
      1000: {
        items: 3,
        loop: true,
      }
    },
  }
  public Image_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    dots:false,
    nav:true, 
    navText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>'],
    mouseDrag: true, 
    responsive: {  
      0: {
        items: 1,
        loop: true,
      },
      400: {
        items: 2,
        loop: true,
      },
      740: {
        items: 3,
        loop: true,
      },     
      1000: {
        items: 4,
        loop: true,
      }
    },
  }
 

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_ProductId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_ProductId')){
        this.ID= JSON.parse(localStorage.getItem('sw_ProductId'));
      }
    } else {      
      if(localStorage.getItem('sw_ProductId')){
        this.ID= JSON.parse(localStorage.getItem('sw_ProductId'));
      }
    } 
   }

  ngOnInit(): void {
    this.getCartDetail();
    this.getProductList(this.ID);
  }

  getProductList(id){
    this.loading =true;
    var detail ={ "product_id":id};
    var url = 'superadmin/webservices/api/products_details';
    this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
      if(response.status == 1){
        this.ProductDetail = response.data;
        this.ProductImages = response.data.product_images;         
        this.similarProductDetail = response.data.similar_products;  
        this.loading = false;
        window.scroll(0,0);
      } else{
        this.loading = false;
      }
    }))
  }


  redirectUrl(detail){
    
  //  var detail ={'tax1': this.ProductDetail.tax1,'tax2':this.ProductDetail.tax2, 'tax1_rate': this.ProductDetail.tax1_rate,'tax2_rate':this.ProductDetail.tax2_rate,'product_quantity':this.ProductDetail.product_quantity, 'product_name': this.ProductDetail.product_name, 'product_price':this.ProductDetail.product_price, 'product_id':this.ProductDetail.product_id,'product_description':this.ProductDetail.product_description,'image_name':this.ProductDetail.product_images[0].image_name}
    this.route.navigate(['/product-buy'],{state:{Detail: detail}});
  }

  redirectUrl1(url,Id){
    this.route.navigate([url],{state:{Id : Id}});
  }

  AddCart(Detail){
    if(this.CartData.length != 0){
        if(this.businessDetail.business_id == this.CartData.business_id){
          this.AddCartData(Detail);
        }
       else {
        Swal.fire({
          title:'Replace cart item?',
          text: 'Your cart contains items from another studio. Do you want to discard the selection and add product from new studio?.',
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
            // Swal.fire(
            //   'Cancelled',
            //   'Cart not updated',
            //   'error'
            // )
          }
        })
        //this.global.dangerAlert('Please clear privos cart data');
      }
    } else {
      this.AddCartData(Detail);
    }
  }

  AddCartData(Detail){
    this.loading = true;
    var url = 'superadmin/webservices/api/add_cart';
    var detail ={  "service_type":"3",    "service_id":Detail.product_id,    "amount":Detail.product_price,    "quantity":"1"};
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getCartDetail();
        this.getProductList(this.ID);
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

  RemoveCartDetail(Detail){
    this.loading = true;
    var detail ={ "remove_cart_type":"1"};
    var url = 'superadmin/webservices/api/remove_cart';
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1) {
        //this.global.successAlert(response.message);
        this.AddCartData(Detail);
      } else{
        this.global.dangerAlert(response.message);
      }
    }))
  }
}
