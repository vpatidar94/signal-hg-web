import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../../Services/data.service';

@Component({
  selector: 'app-my-nutrition',
  templateUrl: './my-nutrition.component.html',
  styleUrls: ['./my-nutrition.component.scss']
})
export class MyNutritionComponent implements OnInit {

  public loading:boolean = true;
  public DietList:any =[];
  public daysList:any=[];
  public currentUrl :any;
  public detail : any={};
  public userDetail:any ={};
  public msg:any ='';
  mactiveClass: any ='';

  constructor(private route: Router, public commonservice: DataService) { 
    this.currentUrl = this.route.url;
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
  }

  ngOnInit(): void {
    this.getDietPlan();
    if(this.currentUrl == '/nutrition'){
      this.getweekdays();
    }    
  }

  getDietPlan(){
    var url;
    if(this.currentUrl == '/my-nutrition'){
      url = "superadmin/webservices/api/nutrition";
    } else {
      url = "superadmin/webservices/instructor/nutrition";
    }      
      this.commonservice.GetApi(url).subscribe((response : any) => {
        if(response.status == 1){
          if(this.currentUrl == '/my-nutrition'){
            var cc = new Date().getDay();
            this.mactiveClass = this.detail.dayId = cc;
            this.DietList = response.data.nutrition;           
            this.daysList = response.data.week;
          } else {
            this.DietList = response.data;
          }
          this.loading = false;
        } else {
          this.msg = response.message;
          this.loading = false;
        }
      })
    // } else {
    //   url = "superadmin/webservices/api/nutrition";
    //   var detail={"business_id": this.userDetail.subscription.business_id};
    //   this.commonservice.PostApi(detail,url).subscribe((response : any) => {
    //     if(response.status == 1){
    //       this.DietList = response.data;
    //       this.loading = false;
    //     } else {
    //       this.msg = response.message;
    //       this.loading = false;
    //     }
    //   })
    // }
  }

  getweekdays(){
    var url="superadmin/webservices/instructor/week_days"
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        this.daysList = response.data;
      } else {
      }
    })
  }

  redirectUrl(id){
    this.detail.dietId = id;
    var url;
    if(this.currentUrl == '/nutrition'){
      url="/nutrition-detail"
    } else {
      url = "/my-nutrition-detail";
    } 
    localStorage.setItem('sw_DietlistDetail',JSON.stringify(this.detail));
    this.route.navigate([url]);
  }

  getDay(id){
    this.mactiveClass = id;
    this.detail.dayId = id;
  }
}
