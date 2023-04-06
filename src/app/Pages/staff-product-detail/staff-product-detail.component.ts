import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
declare var $;


@Component({
  selector: 'app-staff-product-detail',
  templateUrl: './staff-product-detail.component.html',
  styleUrls: ['./staff-product-detail.component.scss']
})
export class StaffProductDetailComponent implements OnInit {

  public navData : any =[];
  public ID : any;
  public ProductDetail : any =[];
  public similarProductDetail : any =[];
  public businessDetail : any =[];
  public loading : boolean = true;

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) {
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
    this.getProductList();
  }

  getProductList(){
    var detail ={ "product_id":this.ID};
    var url = 'superadmin/webservices/api/products_details';
    this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
      if(response.status == 1){
        this.ProductDetail = response.data;         
        //this.similarProductDetail = response.data.similar_products;  
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }


}
