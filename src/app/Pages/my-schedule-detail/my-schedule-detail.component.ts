import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-my-schedule-detail',
  templateUrl: './my-schedule-detail.component.html',
  styleUrls: ['./my-schedule-detail.component.scss']
})
export class MyScheduleDetailComponent implements OnInit {
  public navData : any =[];
  public ID : any;
  public businessDetail : any =[];
  public ClassDetail : any =[]; 
  public ServiceDetail : any =[];
  public WorkshopDetail : any =[];
  public StaffDetail : any =[];
  public PassDetail :any =[];
  public ProductDetail: any = [];
  public userDetail : any = [];
  public loading : boolean = true;
  public studioSpinner: boolean = false;
  public verifySpinner: boolean = false;
  public submitted: boolean = false;
  public addresslength : any;


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService, private location :Location) { 
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_DetailId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_DetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_DetailId'));
      }
    } else {      
      if(localStorage.getItem('sw_DetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_DetailId'));
      }
    } 
  }

  ngOnInit(): void {
    this.getStaffBusinesDetail();    
  }

   getStaffBusinesDetail(){
    var detail ={ "business_id":this.ID};
    var url = 'superadmin/webservices/instructor/get_business_detail' ;
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
       this.businessDetail = response.data;
       var detail = {"business_id":response.data.business_id,'business_name':response.data.business_name, 'address':response.data.address,'logo':response.data.logo,'business_img':response.data.business_img,'email':response.data.email,'latitude':response.data.latitude,'longitude':response.data.longitude,'business_phone':response.data.business_phone,'favourite':response.data.favourite,'video_access':response.data.video_access};
       localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(detail));
       this.addresslength = this.businessDetail.address.length;

       this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  redirect(url){
    this.route.navigate([url]);
  }

  addFav(id,status){
    this.loading = true;
     var detail ={  "service_type":"1",   "service_id":id,   "status":status};
     var url = 'superadmin/webservices/api/favourite';
     this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getStaffBusinesDetail();    
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
   }
}

