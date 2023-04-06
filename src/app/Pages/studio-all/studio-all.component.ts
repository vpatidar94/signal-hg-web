import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-studio-all',
  templateUrl: './studio-all.component.html',
  styleUrls: ['./studio-all.component.scss']
})
export class StudioAllComponent implements OnInit {

  public StudioDetail :any =[];
  public loading : boolean = true;
  public navData : any =[];
  public ID : any;
  public UserInfo : any =[];
  public dashboardDetail : any =[];

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


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService,private location : Location) { 
    this.UserInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData =this.location.getState();
    if(this.navData.Studio){
      localStorage.setItem('sw_StudioData', JSON.stringify(this.navData.Studio));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_StudioData')){
        this.StudioDetail= JSON.parse(localStorage.getItem('sw_StudioData'));
        this.loading = false;
      }
    } else {      
      if(localStorage.getItem('sw_StudioData')){
        this.StudioDetail= JSON.parse(localStorage.getItem('sw_StudioData'));
        this.loading = false;
      }
    } 
  }

  ngOnInit(): void {
  }

  redirectUrl(businessId){
    localStorage.setItem('sw_detailBack', '/allStudio');
    this.route.navigate(['/detail'],{state:{Id : businessId}});
  }
 
  addFav(id,status){
    this.loading = true;
    var detail ={  "service_type":"1",   "service_id":id,   "status":status};
    var url = 'superadmin/webservices/api/favourite';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
     if(response.status == 1){
       this.global.successAlert(response.message);
      // this.route.navigate(['/home']);
       this.getDashboardDetail();
     } else{
       this.global.dangerAlert(response.message);  
       this.loading = false;
  
     }
    }))
  }

  getDashboardDetail(){ 
    this.loading = true;
    var newdata =[],olddata = this.StudioDetail;
    var detail ={ "pageid":"1",   "lat":this.UserInfo.lat,    "lang":this.UserInfo.lang };
    var url = 'superadmin/webservices/api/user_dashboard';
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){ 
        response.data.filter(function (el)
        {if(el.cat_id == olddata.cat_id){
          newdata = el;
        }
        })
        this.StudioDetail = newdata;
       this.loading = false;
      } else{
       this.loading = false;
     }
    }))
  }
}
