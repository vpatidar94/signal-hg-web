import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

declare var $;

@Component({
  selector: 'app-staff-my-appointment-cancle',
  templateUrl: './staff-my-appointment-cancle.component.html',
  styleUrls: ['./staff-my-appointment-cancle.component.scss']
})
export class StaffMyAppointmentCancleComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = true;
  public booking_ID : any;
  public booking_Detail : any = [];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.booking_ID= JSON.parse(localStorage.getItem('sw_BookingId'));

  }

  ngOnInit(): void {
    this.getDetails();
  }

  
  getDetails(){
    var today = new Date();
    var currYear = today.getFullYear();
    var detail = { "pageid": "1", "booking_id":  this.booking_ID};
    var url =  'superadmin/webservices/api/appoiment_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        response.data.slot_date_new = this.global.dateConvert(response.data.slot_date);
        response.data.start_time_new = this.global.timeConvert(response.data.start_time);
        response.data.end_time_new = this.global.timeConvert(response.data.end_time);
        // var birthyear = response.data.user_info.dob.split('-');
        // var age = currYear - birthyear[0];
        // response.data.user_info.age = age;
        response.data.user_info.age.age = this.global.ageCalculation(response.data.user_info.dob);
        this.booking_Detail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }
}
