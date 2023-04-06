import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-my-appointment-payment',
  templateUrl: './staff-my-appointment-payment.component.html',
  styleUrls: ['./staff-my-appointment-payment.component.scss']
})
export class StaffMyAppointmentPaymentComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = false;
  public ServiceDetail : any =[];
  public submitted : any ;
  public userInfo : any = [];
  public bookingFor : any = 'self';
  public memberDetail : any = [];
  public completeBookingDetail : any =[];
  public family_id : any ;
  public policy_detail : any = [];
  public customerInfo : any = [];
  public customerDetail : any = [];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    var CurrentUrl = this.route.url;
    localStorage.setItem('sw_AppointUrl',CurrentUrl) ;  
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.customerInfo = JSON.parse(localStorage.getItem('sw_slectedCustomer'));
    this.completeBookingDetail = JSON.parse(localStorage.getItem('sw_BookedDeatil'));
    //this.completeBookingDetail.totalAmount = this.completeBookingDetail.service_charge + this.completeBookingDetail.service_tax ;
    if(this.userInfo.role_id == 3){
      this.customerDetail = this.userInfo;
      // console.log(this.customerDetail);
    } else {
      this.customerDetail = this.customerInfo;
    }
  }

  ngOnInit(): void {
    //this.cancelationPoliy();
  }

  getBookingFor(event){
    this.bookingFor = event.target.value;
  }

  getMemberList(){
    if(this.memberDetail.length == 0){
      var today = new Date();
      var currYear = today.getFullYear();
      this.loading = true;
      var detail;
      var url;
      if(this.userInfo.role_id == 3){
        url = 'superadmin/webservices/api/get_member_list';
        detail = {"pageid":"1"} ;
      }  else {
        url = 'superadmin/webservices/instructor/get_member_list';
        detail = {"pageid":"1" , "customer_id": this.customerInfo.id} 
      }
      this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
      if(response.status == 1){
        var self = this;
        response.data.filter(function(el){       
          // var birthyear = el.dob.split('-');
          // var age = currYear - birthyear[0];
          // el.age = age;   
          el.age = self.global.ageCalculation(el.dob);
         
        })
        self.memberDetail = response.data;
        self.loading = false;
      } else{
        this.loading = false;
      }
    }))
    }
   
  }

  familydetail(memeber_id){

  }

  confirmbooking(){
    if(this.bookingFor == 'family'){
      if(this.family_id){
      } else{
        this.global.dangerAlert('Please select family member');
        return false;
      }
    } else{
      this.family_id ='';
    }

    //let card = this.paymentCard;
    this.loading = true; 
    var detail;
    var url;
    if(this.userInfo.role_id == 3){
      url = 'superadmin/webservices/api/book_services';
      detail = {

        "service_type":"2",
        "service_id":this.completeBookingDetail.service_id,
        "quantity":1,
        "grand_total":this.completeBookingDetail.totalAmount,
        "slot_date":this.completeBookingDetail.slot_date,
        "slot_time_id":this.completeBookingDetail.slot_time_id,
        "instructor_id" : this.completeBookingDetail.instructor_id,
        "shift_id" :  this.completeBookingDetail.shift_id,
        "start_time_unix":this.completeBookingDetail.start_time_unix,
        "end_time_unix":this.completeBookingDetail.end_time_unix,
        "shift_date" : this.completeBookingDetail.shift_date,
        "family_user_id":this.family_id,
        "tax":this.completeBookingDetail.service_tax,
        "shift_scheduling_id" : this.completeBookingDetail.shift_scheduling_id
    }
    }  else {
      url = 'superadmin/webservices/instructor/book_services';
      detail = {
        "customer":this.customerInfo.id,
        "service_type":"2",
        "service_id":this.completeBookingDetail.service_id,
        "quantity":1,
        "grand_total":this.completeBookingDetail.totalAmount,
        "slot_date":this.completeBookingDetail.slot_date,
        "slot_time_id":this.completeBookingDetail.slot_time_id,
        "instructor_id" : this.completeBookingDetail.instructor_id,
        "shift_id" :  this.completeBookingDetail.shift_id,
        "start_time_unix":this.completeBookingDetail.start_time_unix,
        "end_time_unix":this.completeBookingDetail.end_time_unix,
        "shift_date" : this.completeBookingDetail.shift_date,
        "family_user_id":this.family_id,
        "tax":this.completeBookingDetail.service_tax,
        "token": "123" ,
        "shift_scheduling_id" : this.completeBookingDetail.shift_scheduling_id
    } 
    }

    this.commonservice.PostApi(detail ,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.loading = false;
        if(this.userInfo.role_id == 3){
          this.route.navigate(['/appointments']);
        } else {
          this.route.navigate(['/my-appointment']);
        }
      } else{
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    })) 
  }

  cancelationPoliy(){
    var url = 'superadmin/webservices/api/cancel_policy';
    this.commonservice.GetApi(url).subscribe(((response : any) =>{
      if(response.status == 1){
        this.policy_detail = response.data[0];
      }
    }))
  }
}
