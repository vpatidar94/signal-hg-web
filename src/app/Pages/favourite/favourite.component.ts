import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  public FavDetail : any =[];
  public loading : boolean = true;
  public dataCount : any;
  public userInfo : any = [];
  public pageCount             : any = 1;  
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';

  public eventDetail_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    dots:true,
    mouseDrag: true, 
    navText: ['', ''],
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
    nav: true
  }


    constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
      this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));      
    }

  ngOnInit(): void {
    this.getfavDetail();
  }

  getfavDetail(){
    var fav =[];
    var detail = {  "pageid":this.pageCount  };
    var url = 'superadmin/webservices/api/favouritelist';
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1){       
        if(this.pageCount == 1){          
          if(this.userInfo.role_id == 4){
            response.data.filter(function (el){
              if(el.service_type == 1){
                fav.push(el);
              }
            })
            this.FavDetail = fav;

          } else{
           this.FavDetail = response.data;
          }
        } else {
          fav = this.FavDetail;
          if(this.userInfo.role_id == 4){
            response.data.filter(function (el){
              if(el.service_type == 1){
                fav.push(el);
              }
            })
            this.FavDetail = fav;

          } else{
          this.FavDetail =this.FavDetail.concat(response.data);
          }
        }
        this.loading = false;
      } else{
        this.dataCount = 0;
        if(this.pageCount == 1){
          this.FavDetail = [];
        } 
        
        this.loading = false;
      }
    }))
  }

     //onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount!=0 && this.FavDetail.length == 10) {
      this.pageCount++;
      this.getfavDetail();
    }
  }

  redirectUrl(businessId,url){
    if(url == '/pass-detail'){
      var detail ={'id':businessId ,'url':'/myfavorites'};
      this.route.navigate([url],{state:{Id : detail}});
    } else{
      localStorage.setItem('sw_detailBack', '/myfavorites');
      this.route.navigate([url],{state:{Id : businessId}});
    }
  }
 
  addFav(id,type){
    this.loading = true;
    var detail ={  "service_type":type,   "service_id":id,   "status":"0"};
    var url = 'superadmin/webservices/api/favourite';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.pageCount = 1;
        this.getfavDetail();
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
    }))
  }


}
