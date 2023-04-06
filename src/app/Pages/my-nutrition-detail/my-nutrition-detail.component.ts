import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';


@Component({
  selector: 'app-my-nutrition-detail',
  templateUrl: './my-nutrition-detail.component.html',
  styleUrls: ['./my-nutrition-detail.component.scss']
})
export class MyNutritionDetailComponent implements OnInit {

  public loading:boolean = true;
  public DietList:any =[];
  public dietDetail:any ={};
  public currentUrl :any;
  public businessDetail:any ={};

  constructor(public global :GlobalService,private route: Router, public commonservice: DataService) {
    this.dietDetail =JSON.parse(localStorage.getItem('sw_DietlistDetail'));
    this.currentUrl = this.route.url;
    if(this.currentUrl == '/nutrition-detail'){
      this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    }
    
  }

  ngOnInit(): void {
    this.getListing();
  }

  getListing(){
    var detail={},url;
    if(this.currentUrl == "/nutrition-detail"){
      url ="superadmin/webservices/instructor/customer_meal_list";
      detail = { "nutrition_id": this.dietDetail.dietId,"business_id":this.businessDetail.business_id, "customer_id": localStorage.getItem('sw_clientId')};
      // detail={"nutrition_id": this.dietDetail.dietId, "id": ""}  
      // url ="superadmin/webservices/instructor/get_meal";
    } else {
      detail={"nutrition_id": this.dietDetail.dietId, "week_id":this.dietDetail.dayId, "pageid": 1}  
      url ="superadmin/webservices/api/get_meal";
    }
    this.commonservice.PostApi(detail,url).subscribe(((response : any)=>{
      if(response.status == 1){
        this.DietList = response.data;
        this.loading = false;
      } else {
        this.DietList=[];
        this.loading = false;
      }
    }))
  }

  redirectUrl(item,url){
    localStorage.setItem('sw_DietDetail',JSON.stringify(item));    
    this.route.navigate([url]);
  }

  deleteMeal(id){
    this.loading = true;
    var url ="superadmin/webservices/instructor/delete_meal/" + id;
    this.commonservice.GetApi(url).subscribe(((response : any)=>{
      if(response.status == 1){
        this.getListing();
        this.global.successAlert(response.message);
        // this.loading = false;
      } else {
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }))
  }

}
