import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

declare var $;

@Component({
  selector: 'app-client-my-waitlist',
  templateUrl: './client-my-waitlist.component.html',
  styleUrls: ['./client-my-waitlist.component.scss']
})
export class ClientMyWaitlistComponent implements OnInit {

  public businessDetail : any =[]; 
  public loading : boolean = true;
  public ClassDetail : any = []; 
  public WorkshopDetail : any = []; 
  public WaitingDetail : any = []; 
  public userDetail : any = [];
  public currentUrl : any;
  
  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) { 
        this.currentUrl = this.route.url;    
;
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    // if(this.currentUrl == "/my-workshop"){
    //   this.getworkshop();
    // } else 
    if(this.currentUrl == "/my-classlist"){
      this.getClassDetail('0',0);
    } else{
      this.getClassDetail('1',0);
    }
  }

  ngOnInit(): void {
  }

  getworkshop(){
    var detail = {'pageid': 1};
    var url = 'superadmin/webservices/api/my_book_workshop_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        if(response.data.length!=0){
          var self = this;
          response.data.filter(function (el){
            // Date Conversion UTC
            el.start_date_utc_new = self.global.dateConvert(el.schedule_date);
            // newdate.month = newdate.month + 1;
            // if(newdate.month < 10){
            //   newdate.month = '0'+ newdate.month ;
            // }
            //el.currentdate = newdate.year + "-"+newdate.month+ "-"+newdate.date;
            //el.currentdate = this.global.toTimestamp(new_date.toUTCString());

            //time conversion
            el.from_time_utc_new = self.global.timeConvert(el.start_time);
            el.to_time_utc_new = self.global.timeConvert(el.end_time);
          })
        }
        this.WorkshopDetail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
        this.WorkshopDetail = this.WaitingDetail = this.ClassDetail = [];
      }
    }))
  }

  getClassDetail(status,classStatus){
    var url = 'superadmin/webservices/api/my_class_list';
    var detail ={"pageid":"1", "business_id":this.businessDetail.business_id ,   "status":status,'class_status' :classStatus};
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
        if(response.data.length!=0){
          var self = this;
          response.data.filter(function (el){
            // Date Conversion UTC
            el.start_date_utc_new = self.global.dateConvert(el.start_date_utc);
            // newdate.month = newdate.month + 1;
            // if(newdate.month < 10){
            //   newdate.month = '0'+ newdate.month ;
            // }
            //el.currentdate = newdate.year + "-"+newdate.month+ "-"+newdate.date;

            //el.currentdate = this.global.toTimestamp(new_date.toUTCString());

            el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
            //time conversion
            el.from_time_utc_new = self.global.timeConvert(el.from_time_utc);

          })
        }
        if(status == 1){
          this.WaitingDetail = response.data;
        } else{
          this.ClassDetail = response.data;
        }
        this.loading = false;
      } else{
        this.loading = false;
        this.WaitingDetail = this.ClassDetail = [];
      }
    }))
  }

  reset(){
    this.route.navigate(['/studio-detail']);
  }

  redirectUrl(url,Id,scheId,current){
    var detail = {'id' : Id ,'currentdate': current, 'schedule_id' : scheId ,  'backurl' :this.currentUrl};
    this.route.navigate([url],{state:{Id : detail}});
  }

  showHide(event){   
    this.getClassDetail(0,event.target.value);
  }
}