import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

declare var $;

@Component({
  selector: 'app-client-my-attendance',
  templateUrl: './client-my-attendance.component.html',
  styleUrls: ['./client-my-attendance.component.scss']
})
export class ClientMyAttendanceComponent implements OnInit {

  public businessDetail : any =[];
  public attandanceDetail : any = [];
  public loading : boolean = true;
  public userDetail : any =[];
  //public minValue : any = new Date();
  public summaryData : any = [];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.userDetail= JSON.parse(localStorage.getItem('sw_loginDetail')); 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    //this.attandanceList(0);
    this.getSummary();
  }

  ngOnInit(): void {
  }


  attandanceList(status){
    this.loading = true;
    var detail ={"pageid":"1","business_id":this.businessDetail.business_id,'attendance_for':status };
    var url = 'superadmin/webservices/api/my_classes_attandance';
    this.commonservice.PostApi(detail,url).subscribe(((response :any) =>{
      if(response.status == 1){
        if(response.data.length!=0){
          var self = this;
          response.data.filter(function (el){
            if(el.attendance_for == 2){
            // Date Conversion UTC
            el.start_date_utc_new = self.global.dateConvert(el.shift_date);
            //time conversion
            el.from_time_utc_new = self.global.timeConvert(el.start_time);
            el.to_time_utc_new = self.global.timeConvert(el.end_time);

            } else{
            // Date Conversion UTC
            el.start_date_utc_new= self.global.dateConvert(el.start_date_utc);
            el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);
            //time conversion
            el.from_time_utc_new = self.global.timeConvert(el.from_time_utc);
            }
         
         })
        }
        //this.attandanceDetail = response.data;
        this.loading = false;
      } else{
        this.attandanceDetail = [];
        this.loading = false;
      }
    }))
  }

  reset(){
    this.route.navigate(['/studio-detail']);
  }

  redirectUrl(url,Id,scheId,current){
    var detail = {'id' : Id ,'currentdate': current, 'schedule_id' : scheId,  'backurl' :'/my-attendance'};
    this.route.navigate([url],{state:{Id : detail}});
  }

  showHide(event){
    this.attandanceList(event.target.value);
  }

  getSummary(){
    var detail = {'business_id': this.businessDetail.business_id};
    var url = 'superadmin/webservices/api/my_attendance';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.summaryData = response.data;
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }
}


