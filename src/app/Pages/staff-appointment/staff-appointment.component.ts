import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-appointment',
  templateUrl: './staff-appointment.component.html',
  styleUrls: ['./staff-appointment.component.scss']
})
export class StaffAppointmentComponent implements OnInit {

  public AppointmentDetail : any =[]; 
  public loading : boolean = true;
  public dataCount : any;
  public businessDetail : any =[];
  public pageCount             : any = 1;  
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public currentDate : any = '';
  public currentStatus : any = 'upcoming';
  // public minValue : any = new Date();
  public CurrentUrl : any;
  public hours: any;
  public backurl : any  = localStorage.getItem('sw_BackClass');

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.CurrentUrl = this.route.url;    
    localStorage.setItem('sw_AppointUrl',this.CurrentUrl) ;  
    //this.backurl = localStorage.getItem('sw_BackClass');
  }

  ngOnInit(): void {
    this.getappointment(this.pageCount,'upcoming');
  }

  getappointment(page,status){
    this.loading = true;

    if(this.currentStatus != status){
      this.pageCount = page
    }
    this.currentStatus = status;
    var today = new Date();
    var  currYear = today.getFullYear();
    var searchdate;
    if(this.currentDate){
      searchdate = this.global.toTimestamp(this.currentDate.toUTCString());
    }
    
      var detail = { 'pageid': this.pageCount,'search_dt': searchdate , "business_id":this.businessDetail.business_id ,'transaction_status':status};
      var url= 'superadmin/webservices/instructor/my_book_services_list';
      //var detail ={"pageid":this.pageCount, "business_id":this.businessDetail.business_id ,  "upcoming_date":this.currentDate,    "appointment_status":status};
      this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
        if(response.status == 1){
          if(response.data.length!=0){
            var self = this;
            response.data.filter(function (el){
              // Date Conversion UTC
              el.start_date_utc_new = self.global.dateConvert(el.shift_date);
              el.start_time_new = self.global.timeConvert(el.start_time);
              el.end_time_new = self.global.timeConvert(el.end_time);
              el.age = self.global.ageCalculation(el.date_of_birth);
              el.tax_amount =  parseFloat( el.tax1_rate) + parseFloat(el.tax2_rate);
              el.sub_total = parseFloat(el.amount) + el.tax_amount;
              el.Name = el.name +' '+ el.lastname;
              if(el.family_user_id != 0){
                el.age = self.global.ageCalculation(el.family_dob);
                el.Name = el.family_member_name ;
                el.gender = el.family_gender ;
                el.profile_img = el.family_profile_img ;
              }
            })
          }
          if(this.pageCount == 1){
            this.AppointmentDetail = response.data;
          } else {
            this.AppointmentDetail =this.AppointmentDetail.concat(response.data);
          }
         this.loading = false;
        } else{
          this.dataCount = 0;
          if(this.pageCount == 1){
            this.AppointmentDetail = [];
          }
          this.loading = false;
        }
      }))
  }
  
  upcoming(){
    this.getappointment(1,this.currentStatus);
  }

  reset(){
    this.currentDate = '';
    this.getappointment(1,this.currentStatus);

  }

  // redirectUrl(url,Id){
  //   this.route.navigate([url],{state:{Id : Id}});
  // }

//onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount!=0 && this.AppointmentDetail.length == 10) {
      this.pageCount++;
      this.getappointment(this.pageCount,this.currentStatus);
    }
  }

  getval(event){
    this.getappointment(1,event.target.value);
  }

  increaseDate(){
    // add a day
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate)
    this.getappointment(1,this.currentStatus);
    }
    
    
    decreaseDate(){
    // decrease a day
    // if(this.currentDate.getDate() == this.minValue.getDate() && this.currentDate.getMonth() == this.minValue.getMonth() && this.currentDate.getYear() == this.minValue.getYear() ){
    //   return false;
    // } else{
      this.currentDate.setDate(this.currentDate.getDate() - 1);
      this.currentDate = new Date(this.currentDate)
      this.getappointment(1,this.currentStatus);
    // }
   
    }

    redirectUrl(id){
      localStorage.setItem('sw_Booking_detail',<any> JSON.stringify(id));
      this.route.navigate(['/booking-detail']);
    }
  }
