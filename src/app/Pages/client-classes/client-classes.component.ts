import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-classes',
  templateUrl: './client-classes.component.html',
  styleUrls: ['./client-classes.component.scss']
})
export class ClientClassesComponent implements OnInit {

  public businessDetail : any =[];
  public ClassDetail : any =[]; 
  public loading : boolean = true;
  public dataCount : any;

  public pageCount             : any = 1;  
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public currentDate : any = new Date();
  public CurrentUrl :any;
  public currentStatus : any = 0;
  public CurrentVal : boolean ;
  public minValue : any = new Date();
  public updatedDate : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) {
    this.CurrentUrl = this.route.url;    
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.getClassDetail(this.pageCount,this.currentStatus);
    localStorage.removeItem('sw_ClassId');
   }

  ngOnInit(): void {  } 

  getClassDetail(page,statusVal){
    this.loading = true;
    var detail,url;
    var new_date,send_date;
    if(this.currentStatus != statusVal){
      this.pageCount = page
    }
    this.currentStatus = statusVal;
    if(this.currentDate){
     new_date = this.currentDate;
    } else{
     new_date = this.minValue;
    }
    this.updatedDate = send_date = this.global.toTimestamp(new_date.toUTCString());
      if(this.CurrentUrl == "/workshops"){
        url = 'superadmin/webservices/api/workshop_list';
        detail ={"pageid":this.pageCount, "business_id":this.businessDetail.business_id ,  "upcoming_date":send_date,    "workshop_status":statusVal};
        this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
          if(response.status ==1){
            if(response.data.length!=0){
              var self = this;
              response.data.filter(function (el){
                // Date Conversion UTC
                el.start_date_utc_new = self.global.dateConvert(el.schedule_date);
                // el.end_date_utc_new = self.global.dateConvert(el.end);
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
            if(this.pageCount == 1){
              this.ClassDetail = [];
            } 
            this.loading = false;
          }
        }))
      } else{
        url = 'superadmin/webservices/api/class_list';
        detail ={"pageid":this.pageCount, "business_id":this.businessDetail.business_id ,  "upcoming_date":send_date,    "class_status":statusVal};
        this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
          if(response.status ==1){
            if(response.data.length!=0){ 
              var self = this;
              response.data.filter(function (el){
                // Date Conversion UTC
                el.start_date_utc_new = self.global.dateConvert(el.start_date_utc);
                el.end_date_utc_new = self.global.dateConvert(el.end_date_utc);

                //time conversion
                el.from_time_utc_new = self.global.timeConvert(el.from_time_utc);
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
    this.CurrentVal = true;
    this.getClassDetail(1,this.currentStatus);
  }

  reset(){
    this.CurrentVal = false;
    this.currentDate = new Date();
    this.getClassDetail(1,0);
  }

  redirectUrl(url,Id,scheId,date){
    var detail = {'id' : Id ,'currentdate': date, 'schedule_id' : scheId, 'backurl' :this.CurrentUrl};
    this.route.navigate([url],{state:{Id : detail}});
  }

//onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount !=0 && this.ClassDetail.length == 10) {
      this.pageCount++;
      this.getClassDetail(this.pageCount,this.currentStatus);
    }
  }

  getval(event){  
    this.getClassDetail(1,event.target.value);
  }

  increaseDate(){
    // add a day    
    this.CurrentVal = true;

    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate)
    this.getClassDetail(1,this.currentStatus);
    }
    
    
    decreaseDate(){
    // decrease a day
    this.CurrentVal = true;

    if(this.currentDate.getDate() == this.minValue.getDate() && this.currentDate.getMonth() == this.minValue.getMonth() && this.currentDate.getYear() == this.minValue.getYear() ){
      return false;
    } else{
      this.currentDate.setDate(this.currentDate.getDate() - 1);
      this.currentDate = new Date(this.currentDate)
      this.getClassDetail(1,this.currentStatus);
    }
   
    }
}
