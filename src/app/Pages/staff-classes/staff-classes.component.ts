import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

declare var $;

@Component({
  selector: 'app-staff-classes',
  templateUrl: './staff-classes.component.html',
  styleUrls: ['./staff-classes.component.scss']
})

export class StaffClassesComponent implements OnInit {


  public ClassDetail : any =[]; 
  public loading : boolean = true;
  public dataCount : any;
  public businessDetail : any =[];
  public pageCount             : any = 1;  
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public currentDate : any ='';
  public CurrentUrl :any;
  public currentStatus : any = 0;
  public minValue : any = new Date();
  public updatedDate : any;
  public classType : any = '0';


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.CurrentUrl = this.route.url;    
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.getClassDetail(this.currentStatus,this.pageCount);
    localStorage.removeItem('sw_ClassId');
   }

  ngOnInit(): void {  } 

  getClassDetail(statusVal,page){
    this.loading = true;

    var new_date,send_date;
    if(this.currentStatus != statusVal){
      this.pageCount = page
    }
    this.currentStatus = statusVal;
    if(this.currentDate){
      new_date = this.currentDate;
      this.updatedDate = send_date = this.global.toTimestamp(new_date.toUTCString());
    } else{
      send_date = '';
    }
      // new_date = this.currentDate;
      // this.updatedDate = send_date = this.global.ToDate(new_date);
      //this.updatedDate = send_date = this.global.toTimestamp(new_date.toUTCString());
  
    // if(!this.currentDate){
    //   var today = new Date();
    //   var currDay = today.getDate();
    //   var currMonth = today.getMonth()+1;
    //   var newmonth;
    //   if(currMonth < 10){
    //     newmonth = '0'+ currMonth;
    //   }
    //   var currYear = today.getFullYear();
    //   this.currentDate =currYear+ "-" + newmonth + "-" + currDay;
    // }

      if(this.CurrentUrl == "/workshopss"){
        var url ='superadmin/webservices/instructor/workshop_list';
        var detail = {"pageid":this.pageCount, "business_id":this.businessDetail.business_id ,  "upcoming_date":send_date,    "workshop_status":statusVal};
        this.commonservice.PostApi( detail , url).subscribe(((response: any)=> {
          if(response.status ==1){
            if(response.data.length!=0){
              var self = this;
              response.data.filter(function (el){
                // Date Conversion UTC
                el.scheduled_date_new = self.global.dateConvert(el.schedule_date);

                // Date Conversion UTC
                //  el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);

                //time conversion
                el.from_time_utc_new = self.global.timeConvert(el.start);
                el.end_time_utc_new = self.global.timeConvert(el.end);

              })
            }
            if(this.pageCount == 1){
              this.ClassDetail = response.data;
            } else {
              this.ClassDetail =this.ClassDetail.concat(response.data);
            }
          this.loading = false;
          } else{
            this.dataCount = 0;
            this.ClassDetail =[];
            this.loading = false;
          }
        }))

    } else{
      var url = 'superadmin/webservices/instructor/class_list';
      var detail1 ={"pageid":this.pageCount, "business_id":this.businessDetail.business_id ,  "upcoming_date":send_date,    "class_status":statusVal};
      this.commonservice.PostApi( detail1,url).subscribe(((response: any)=> {
        if(response.status ==1){
          if(response.data.length!=0){
            var self = this;
            response.data.filter(function (el){
              // Date Conversion UTC
              el.scheduled_date_new = self.global.dateConvert(el.scheduled_date);

              // Date Conversion UTC
              el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);

              //time conversion
              el.from_time_utc_new = self.global.timeConvert(el.from_time);

           })
          }
          if(this.pageCount == 1){
            this.ClassDetail = response.data;
          } else {
            this.ClassDetail =this.ClassDetail.concat(response.data);
          }
         this.loading = false;
        } else{
          this.dataCount = 0;
          if(this.pageCount == 1){
            this.ClassDetail = [];
          } 
          this.loading = false;
        }
      }))
    }
  }

  upcoming(){
    this.getClassDetail(this.currentStatus,1);
  }

  reset(){    
    this.currentDate = '';
    this.getClassDetail(this.currentStatus,1);
  }

  redirectUrl(url,classId,date,Id){
    var detail = {'id' : classId ,'currentdate':date,'schduleId' : Id, 'backurl' :this.CurrentUrl,'status': this.currentStatus};
    this.route.navigate([url],{state:{Id : detail}});
  }

  redirectUrl1(url,Id){
    this.route.navigate([url],{state:{Id : Id}});
  }

//onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount !=0 && this.ClassDetail.length == 20) {
      this.pageCount++;
      this.getClassDetail(this.currentStatus,this.pageCount);
    }
  }

  getval(event){
    this.classType = event.target.value;
    this.getClassDetail(event.target.value,1);
  }

  increaseDate(){
    // add a day
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate)
    this.getClassDetail(1,this.currentStatus);
    }
    
    
    decreaseDate(){
    // decrease a day
      if(this.currentDate.getDate() == this.minValue.getDate() && this.currentDate.getMonth() == this.minValue.getMonth() && this.currentDate.getYear() == this.minValue.getYear() ){
        return false;
      } else{
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.currentDate = new Date(this.currentDate)
        this.getClassDetail(1,this.currentStatus);
      }
    }

    back(){
      var url = localStorage.getItem('sw_BackClass')
      this.route.navigate([url]);
    }
}

