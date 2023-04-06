import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import { Options } from 'ng5-slider';

declare var $;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public loading : boolean = false;
  public navData : any =[];
  public SearchDetail : any =[];
  public categoryList : any =[];
  public subcategoryList : any =[];
  public subcategoryText : any;
  public categoryText : any;
  public searchText : any;
  public selectedItemsList:  any = [];
  public distanceMode: boolean = false;
  public slidervalue: any = 0;
  public sliderhighValue: any =500;
  public slideroptions: Options = {
    floor: 0,
    ceil: 500,
    showSelectionBar: true,
    minLimit:5,
  };

  public eventDetail_Options: OwlOptions = {
    loop:true,
    margin:40,
    autoplay: false,
    dots:true,
    mouseDrag: true, 
    navText: ['', ''],
    responsive: {  
      0: {
        items: 5,
        loop: true,
      },
      400: {
        items: 5,
        loop: true,
      },
      740: {
        items:5,
        loop: true,
      },     
      1000: {
        items: 5,
        loop: true,
      }
    },
    nav: true
  }

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location : Location) {
    this.navData =this.location.getState();
    if(this.navData.SerchData){   
      localStorage.setItem('sw_searchDetail',<any> JSON.stringify(this.navData.SerchData));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined)  {    
      if(localStorage.getItem('sw_searchDetail')){
        this.SearchDetail = JSON.parse(localStorage.getItem('sw_searchDetail'));
      }
    } else {  
      this.SearchDetail =  this.navData.SerchData;
      }
     // this.searchFilter();
   }

  ngOnInit(): void {
  }

  addFav(id,status){
    this.loading = true;
     var detail ={  "service_type":"1",   "service_id":id,   "status":status};
     var url = 'superadmin/webservices/api/favourite';
     this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.route.navigate(['/home']);
        //this.searchFilter();
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
   }

  redirectUrl(businessId){
    localStorage.setItem('sw_detailBack', '/search');
    this.route.navigate(['/detail'],{state:{Id : businessId}});
  }

}

