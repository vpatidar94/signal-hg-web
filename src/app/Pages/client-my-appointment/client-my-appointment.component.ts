import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-client-my-appointment',
  templateUrl: './client-my-appointment.component.html',
  styleUrls: ['./client-my-appointment.component.scss']
})
export class ClientMyAppointmentComponent implements OnInit {

  public loading : boolean = true;
  public BookedserviceList : any = [];
  public businessDetail : any = [];
  public currentDate : any;
  //public minValue : any = new Date();

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
        var CurrentUrl = this.route.url;
    localStorage.setItem('sw_AppointUrl',CurrentUrl) ;  

  }

  ngOnInit(): void {
    this.getList('0');
  }

  getList(status){
    var today = new Date();
    var currYear = today.getFullYear();
    var searchdate;
    if(this.currentDate){
      searchdate = this.global.toTimestamp(this.currentDate.toUTCString());
    }
    var detail = {'pageid': '1','search_dt': searchdate,"business_id":this.businessDetail.business_id,'transaction_status' : status};
    var url = 'superadmin/webservices/api/my_book_services_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) =>{
      if(response.status == 1){
        if(response.data.length != 0){
          var self = this;
          response.data.filter(function (el){
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
        this.BookedserviceList = response.data;
        this.loading = false;
      } else{
        this.BookedserviceList = [];
        this.loading = false;
      }
    }))
  }

  increaseDate(){
    // add a day
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.currentDate = new Date(this.currentDate)
    this.getList('0');
    }
    
    
    decreaseDate(){
    // decrease a day
    // if(this.currentDate.getDate() == this.minValue.getDate() && this.currentDate.getMonth() == this.minValue.getMonth() && this.currentDate.getYear() == this.minValue.getYear() ){
    //   return false;
    // } else{
      this.currentDate.setDate(this.currentDate.getDate() - 1);
      this.currentDate = new Date(this.currentDate)
      this.getList('0');
    //}
   
    }

    reset(){
      this.currentDate = '';
      this.getList('0');
    }

  redirectUrl(id){
    localStorage.setItem('sw_Booking_detail',<any> JSON.stringify(id));
    this.route.navigate(['/booking-detail']);
  }

  showHide(event){   
    this.getList(event.target.value);
  }
}
