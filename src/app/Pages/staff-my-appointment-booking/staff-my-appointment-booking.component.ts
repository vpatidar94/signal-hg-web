import { Component, OnInit,ViewEncapsulation, Input,Renderer2,AfterViewInit   } from '@angular/core';
//import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatCalendarCellCssClasses  } from '@angular/material/datepicker';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-staff-my-appointment-booking',
  templateUrl: './staff-my-appointment-booking.component.html',
  styleUrls: ['./staff-my-appointment-booking.component.scss'],
  encapsulation: ViewEncapsulation.None

})

export class StaffMyAppointmentBookingComponent implements OnInit {

  public navData : any;
  public businessDetail : any = [];
  public loading : boolean = true;
  public serviceID : any;
  public staffDetail : any =[];
  public staffDates : any = [];
  public slotDetail : any = [];
  public minValue : any = new Date();
  public maxval : any ;
  public currentDate : any = new Date();
  public selectedslot : any =[];
  public bookedDeatil : any =[];
  public bookingDeatil : any =[];
  public selectedDate : any ='';
  public serviceDetail : any = [];
  public serviceName : any;
  public userdetail : any = [];
  public apicall : boolean = false;
  public currentYear = new Date().getFullYear();
  public currentMonth = new Date().getMonth();
  public counter = 1;

  constructor(public global :GlobalService,private renderer: Renderer2,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.serviceID = JSON.parse(localStorage.getItem('sw_serviceId'));
    this.serviceName = localStorage.getItem('sw_serviceName');
    this.staffDetail = JSON.parse(localStorage.getItem('sw_service_StaffDetail'));
    this.userdetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    var last = new Date(this.currentYear, this.currentMonth+4, 0).getDate();
    this.maxval =new Date(this.currentYear, this.currentMonth+3, new Date().getDate());
  }

  ngOnInit(): void {
    this.getBookingDate();
    this.getBookingSlot();
  }

  getBookingSlot(){
    this.loading = true;
    this.selectedDate = this.toTimestamp(this.currentDate);
    var detail = {"business_id":this.businessDetail.business_id,"service_id" : this.serviceID, "instructor_id":this.staffDetail.id, "service_date": this.selectedDate  }
    var url;
    if(this.userdetail.role_id == 3){
      url = 'superadmin/webservices/api/service_scheduling_time_slot';
    }  else {
      url = 'superadmin/webservices/instructor/service_scheduling_time_slot';
    }
    this.commonservice.PostApi(detail ,url).subscribe(((response : any) =>
    {
      if(response.status == 1){
        const data = response.data; 
        for(let i=0;i<data.length;i++)  {
          const slot = data[i].slot;
          for(let j=0;j<slot.length;j++)  {
            slot[j].start_time_new = this.global.timeConvert(slot[j].start_time_unix);
            slot[j].end_time_new = this.global.timeConvert(slot[j].end_time_unix);
            slot[j].isChecked = false;
          }
        }   
        this.bookingDeatil =  data;
        // this.serviceName = this.bookingDeatil[0].services_collection.service_name ;
        this.loading = false;
      } else{
        this.bookingDeatil = [];
        this.loading = false;
      }
     // $('#opencalender').trigger('click');
    }))
  }

  getBookingDate(){
    var url = 'superadmin/webservices/api/getInstructorShiftDate';
    var detail = {"business_id":this.businessDetail.business_id,"service_id" : this.serviceID, "instructor_id":this.staffDetail.id }
    this.commonservice.PostApi(detail,url).subscribe(((response : any) =>
    {
      if(response.status == 1){
        const data = response.data; 
        for(let i=0;i<data.length;i++)  {
          data[i].shift_date_new = this.global.dateConvert(data[i].shift_date);
          var d =   data[i].shift_date_str.split('-') ;
          d[1] = d[1].replace(/^0+/, '');   
          d[2] = d[2].replace(/^0+/, '');       
          data[i].shift_date_str_new = d[0] +'-'+ d[1]  +'-'+d[2];
          this.staffDates.push( data[i].shift_date_str_new);
        }    
          this.apicall = true;
          this.dateClass();          
          this.loading = false;
      } else{
        this.staffDates = [];
        this.apicall = true;
        this.dateClass();          
        this.loading = false;
      }
    }))
  }

  /*
  * Convert Normal date to timestamp
  * @return timestamp value of normal date
 */
  toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
  }


  changeSelection(event,service) {
    this.selectedslot = event;
    this.serviceDetail = service;
    // this.selectedslot = this.slotDetail.filter((value, index) => {
    //   return value.isChecked
    // });
  } 

  booking(){
    if(this.selectedslot.length != 0){ 
      var newdate = this.global.dateConvert(this.selectedDate);
      var name = this.staffDetail.name +" " + this.staffDetail.lastname;
      var tax = parseFloat(this.serviceDetail.services_collection.tax1_rate) + parseFloat(this.serviceDetail.services_collection.tax2_rate);
      this.serviceDetail.service_location =  this.serviceDetail.location_name +', '+this.serviceDetail.address;
      var detail = {
        'Converted_date':newdate,'slot_date':this.selectedDate, 'slot_time_id':this.selectedslot.id,'service_id':this.serviceDetail.services_collection.id, 'from_time':this.selectedslot.start_time_new,'to_time':this.selectedslot.end_time_new,'duration':this.serviceDetail.services_collection.duration,'instructor_id':this.staffDetail.id,'instrutor_name':name ,'service_charge':this.serviceDetail.services_collection.amount,'totalAmount' :this.serviceDetail.services_collection.service_total_price, 'tax1_rate':this.serviceDetail.services_collection.tax1_rate,'tax2_rate':this.serviceDetail.services_collection.tax2_rate,   'service_tax':this.serviceDetail.services_collection.service_tax_price,'skills':this.staffDetail.skill  ,
        'start_time_unix':this.selectedslot.start_time_unix,      'end_time_unix':this.selectedslot.end_time_unix,      'shift_date':this.selectedslot.shift_date ,'service_name':this.serviceDetail.services_collection.service_name ,'location_url':this.serviceDetail.location_url ,'service_location':this.serviceDetail.service_location ,'shift_id':this.serviceDetail.shift_id,'cancel_policy':this.serviceDetail.services_collection.cancel_policy,'shift_scheduling_id':this.serviceDetail.shift_scheduling_id}
      localStorage.setItem('sw_BookedDeatil',<any> JSON.stringify(detail));
      this.route.navigate(['/booking-payment']);
    } else{
      this.global.dangerAlert('Please select slots');
    }
  //,{state:{Id : id}}
  }

  dateClass() {  
    return (date: Date): MatCalendarCellCssClasses => {     
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      const prepareDate = `${y}-${m}-${d}`;
      if(this.staffDates.indexOf(prepareDate) != -1){
        return 'special-date';
      } else{
        //return 'special1-date';
      }
    };
  }
}
