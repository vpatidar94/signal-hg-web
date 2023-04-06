import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-my-workshop',
  templateUrl: './client-my-workshop.component.html',
  styleUrls: ['./client-my-workshop.component.scss']
})
export class ClientMyWorkshopComponent implements OnInit {

  public businessDetail : any =[];
  public navData : any =[];
  public TransactionID : any ;
  public loading : boolean = true;
  public ClassData : any =[];
  public classStatus: any ;
  public workshopStatus: any;
  public currentUrl : any ;
  public instrustorData : any = [] ;
  public CustomerDetail : any = [];
  public View : Boolean = false;
  public userInfo : any = [] ;
  public submitted : boolean;
  public WorkshopDetail : any  = [];

 
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.currentUrl = this.route.url;   
    //localStorage.setItem('sw_backUrl', this.currentUrl) ;  
    this.userInfo =JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
  }

  ngOnInit(): void {
    this.getworkshop('0');
  }
  
  back(){
    if(this.View){
      this.View = false;
    } else{
      this.route.navigate(['/studio-detail']);
    }
  }

  redirectUrl(id,url,urlcurrent){
    if(urlcurrent){     
      if(id.ageallow){
        var detail ={'id':id.pass_id ,'url':this.currentUrl};
        this.route.navigate([url],{state:{Id : detail}});  
      } else{
        this.global.dangerAlert('You are not eligible');
      }
    } else{
      this.route.navigate([url],{state:{Id : id}});
    }
  }

  Cancle(){
    var detail = {'transaction_id': this.TransactionID};
    var url = 'superadmin/webservices/api/workshop_appointment_cancel';
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
       this.View = false;
      } else {
        this.global.dangerAlert(response.message);
      }
    }))
  }

  getworkshop(status){
    var detail = {'pageid': 1,'workshop_status' : status,"business_id":this.businessDetail.business_id,};
    var url = 'superadmin/webservices/api/my_book_workshop_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        if(response.data.length!=0){
          var self = this;
          response.data.filter(function (el){
            // Date Conversion UTC
            el.start_date_utc_new = self.global.dateConvert(el.schedule_date);
            //time conversion
            el.from_time_utc_new = self.global.timeConvert(el.start);
            el.to_time_utc_new = self.global.timeConvert(el.end);
          })
        }
        this.WorkshopDetail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
        this.WorkshopDetail = [];
      }
    }))
  }

  getWorkshopDetail( w_id,s_id,t_id,booking_status){
    this.loading = true;
    var detail = {"business_id":this.businessDetail.business_id,  "workshop_id":w_id , 'schedule_id' :s_id}
    var url = 'superadmin/webservices/api/business_workshop_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        
          // Date Conversion UTC
          response.data.start_date_utc_new = this.global.dateConvert(response.data.schedule_date);
          response.data.end_date_utc_new = this.global.dateConvert(response.data.end_date_utc);
              // time conversion

              response.data.from_time_new = this.global.timeConvert(response.data.start);
              response.data.to_time_new = this.global.timeConvert(response.data.end);
            if(response.data.instructor_details.length != 0){
          var self = this, ageal;
          response.data.instructor_details.filter(function (el){
            el.from_time_new = self.global.timeConvert(el.from_time_utc);
            el.to_time_new = self.global.timeConvert(el.to_time_utc);
          })
        }
        this.ClassData = response.data;

        this.instrustorData = response.data.instructor_details;
        this.workshopStatus = booking_status;
        this.TransactionID = t_id;
        this.CustomerDetail = response.data.customer_details;
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  showHide(event){   
    this.getworkshop(event.target.value);
  }

}
