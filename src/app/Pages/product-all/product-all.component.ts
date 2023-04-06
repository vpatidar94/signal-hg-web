import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.scss']
})
export class ProductAllComponent implements OnInit {

  public businessDetail : any = [];
  public loading : boolean = true;
  public ItemDetail : any = [];
  public search_text:any;
  public search_category: any;
  public sort_price: any = 'low';


  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.gatAllProductList();

  }

  ngOnInit(): void {
  }

  gatAllProductList(){ 
    var url =  'superadmin/webservices/api/all_products_list';   
    var detail ={  "pageid":"1", "business_id":this.businessDetail.business_id, "search_text":this.search_text,  "search_category":this.search_category, "sort_price":this.sort_price}
    this.commonservice.PostApi( detail ,url).subscribe(((response : any)=> {
      if(response.status == 1){
        this.ItemDetail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
        this.ItemDetail =[];
      }
    }))
  }

  redirectUrl(Id){
    this.route.navigate(['/product'],{state:{Id : Id}});
  }

  clearAll(){
    this.search_category ='';     
    this.search_text =''; 
    this.sort_price ='';
    this.gatAllProductList();
  }

  getPrice(event){
    this.sort_price = event.target.value;  
  }
  
}

