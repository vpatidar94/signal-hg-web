import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { FormGroup,FormControl,Validators } from '@angular/forms'; 
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-shift',
  templateUrl: './staff-shift.component.html',
  styleUrls: ['./staff-shift.component.scss']
})
export class StaffShiftComponent implements OnInit {


  public shiftDetail : any =[]; 
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
  public currentStatus : any = 1;
  public minValue : any = new Date();
  public updatedDate : any;
  public shiftStatus : any = '0';
  public requestDetail : any = [];
  public schdule_id : any;
  public shiftSpinner : boolean = false;
  public submitted: boolean = false;
  public shiftID : any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.CurrentUrl = this.route.url;    
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.getShiftDetail(this.pageCount,this.currentStatus);
    localStorage.removeItem('sw_ClassId');
   }

  ngOnInit(): void {  } 

  usershift = new FormGroup({ 
    changerequest: new FormControl('',Validators.compose([
      Validators.required])),
  })

  // convenience getter for easy access to form fields
  get sf() { return this.usershift.controls; }

  upcoming(){
    this.getShiftDetail(1,this.currentStatus);
  }

  reset(){    
    this.currentDate = '';
    this.getShiftDetail(1,this.currentStatus);
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
    if(this.dataCount !=0 && this.shiftDetail.length == 20) {
      this.pageCount++;
      this.getShiftDetail(this.pageCount ,this.currentStatus);
    }
  }

  getval(event){
    this.getShiftDetail(1,event.target.value);
  }

  increaseDate(){
    // add a day
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate)
    this.getShiftDetail(1,this.currentStatus);
    }
    
    
    decreaseDate(){
    // decrease a day
      if(this.currentDate.getDate() == this.minValue.getDate() && this.currentDate.getMonth() == this.minValue.getMonth() && this.currentDate.getYear() == this.minValue.getYear() ){
        return false;
      } else{
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.currentDate = new Date(this.currentDate)
        this.getShiftDetail(1,this.currentStatus);
      }
    }

    back(){
      var url = localStorage.getItem('sw_BackClass')
      this.route.navigate([url]);
    }

    getShiftDetail(count,status){
      this.currentStatus = status;
      var selectdate, commentsData;
      if(this.currentDate){
        selectdate = this.global.toTimestamp(this.currentDate.toUTCString());
      } else {
        selectdate='';
      }
      var detail = { "pageid":count,    "business_id":this.businessDetail.business_id, 'shift_status':status, "upcoming_date":selectdate} ;
      var url = 'superadmin/webservices/instructor/shift_list';
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          if(response.data.length!=0){
            var self = this;
            response.data.filter(function (el){
              // Date Conversion UTC
              el.shift_date_new = self.global.dateConvert(el.shift_date);
  
              //time conversion
              el.start_time_new = self.global.timeConvert(el.start_time);
  
              //time conversion
              el.end_time_new = self.global.timeConvert(el.end_time);
              if(self.schdule_id){
                if(el.id == self.schdule_id){
                  self.requestDetail = el.comment;
                }
              }
              if(el.comment.length != 0){ 
                el.comment.filter(function (ell){
                  // Date Conversion UTC
                  ell.date_new = self.global.dateConvert(ell.create_dt);
                  ell.time = self.global.timeConvert(ell.create_dt);
                })
              }
            })
          }
          if(this.pageCount == 1){
            this.shiftDetail = response.data;
          } else {
            this.shiftDetail =this.shiftDetail.concat(response.data);
          }
          this.loading = false;
          } else{
            this.dataCount = 0;
            this.shiftDetail = [];
            this.loading = false;
          }
        }))
      }

    closeModal(){
      this.submitted = false;    
      this.usershift.reset();
      this.requestDetail = [];
    }  

    shiftChangeRequest(){
      this.loading = true;
      this.submitted = true;
      if(this.usershift.valid){
        var url = 'superadmin/webservices/instructor/shift_cancel_request';
        var detail = {'business_id':this.businessDetail.business_id,  'shift_id':this.shiftID,  'reason': this.usershift.value.changerequest,'shift_schedule_id':this.schdule_id};
        this.commonservice.PostApi(detail,url).subscribe(((response : any )=>{
          if(response.status == 1){
            this.global.successAlert(response.message);
            this.loading = false
            this.submitted = false;
            this.usershift.reset();
            this.getShiftDetail(this.pageCount,this.currentStatus);
           // this.shiftCommentDetail();
          } else {
            this.global.dangerAlert(response.message);      
            this.loading = false
          }
        }))
      } else{
        this.loading = false;
        return false;
      } 
  } 

  changeSelection(item){
    this.requestDetail = [];
    this.shiftID = item.shift_id;
    this.schdule_id = item.id;
    // this.statusVal = item.status;
    this.requestDetail = item.comment;
  }
    
}


