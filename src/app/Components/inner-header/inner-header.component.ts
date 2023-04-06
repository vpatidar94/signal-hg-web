import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-inner-header',
  templateUrl: './inner-header.component.html',
  styleUrls: ['./inner-header.component.scss']
})
export class InnerHeaderComponent implements OnInit {

  public cartCount : any ;
  public userDetail : any = [] ;
  public NotificationDetail : any =[];
  public UnreadCount : any;
  public pagecount: any = 1;
  subscription: Subscription;
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public dataCount : any;
  public Username : any;
  public memberDetail : any = [];
  public parentDetail : any = [];
  public ProfileDetail : any =[];
  public CountryList : any = [];
  public ImageName : any ;
  public CurrentUrl :any;

    constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
      this.CurrentUrl = this.route.url;   
      this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
      this.memberDetail = JSON.parse(localStorage.getItem('sw_MemberDetail'));
      this.parentDetail = JSON.parse(localStorage.getItem('sw_ParentDetail'));
      if(this.userDetail.role_id == 3){
        this.subscription = this.commonservice.getSubject().subscribe(message=>{this.cartCount=message.cartdata;
        });
        if(localStorage.getItem('sw_CartValues')){
          this.cartCount = JSON.parse(localStorage.getItem('sw_CartValues'));
        } else{
          this.getCartDetail();
        }
    
      }
      
     }

  ngOnInit() {
    this.getNotifiction();   
  }

  logOut(){
    var arr = []; 
    for (var i = 0; i < localStorage.length; i++)
    { if (localStorage.key(i).substring(0,3) == 'sw_') 
    {if(localStorage.key(i) != 'sw_Remember') 
    {arr.push(localStorage.key(i)); } }}     
    for (var i = 0; i < arr.length; i++)
    { localStorage.removeItem(arr[i]); 
    }  
  }

  getCartDetail(){
    var detail ={    "pageid":"1"};
    var url = 'superadmin/webservices/api/cart_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){      
        localStorage.setItem('sw_CartValues',<any> JSON.stringify(response.data.total_item));
        this.commonservice.setSubject(response.data.total_item);
      } else{
      }
    }))

  }

  getNotifiction(){
    var detail ={"pageid":this.pagecount};
    var url = 'superadmin/webservices/api/get_notification_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        if(response.data.notification.length!=0){
          const data = response.data.notification; 
          for(let i=0;i<data.length;i++)  {
             // Date Conversion UTC
             data[i].create_dt_utc_new = this.global.dateConvert(data[i].create_dt_utc);
         }
        }
        if(this.pagecount == 1){
          this.NotificationDetail = response.data.notification;
        } else {
          this.NotificationDetail =this.NotificationDetail.concat(response.data.notification);
        }
        this.UnreadCount = response.data.unread_count;
      } else{
        this.dataCount = 0;
      }
    }))
  }

  getMarkRead(data){
    if(data.read == 0){
      this.markRead(data.id);
    }
    var url, detail = {};
    var details = data.content_object;
    localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(data.business_info));
    localStorage.setItem('sw_DetailId', details.business_id);

    if(data.appointment_info.name){
      data.appointment_info.start_date_utc_new = this.global.dateConvert(data.appointment_info.shift_date);
      data.appointment_info.start_time_new = this.global.timeConvert(data.appointment_info.start_time);
      data.appointment_info.end_time_new = this.global.timeConvert(data.appointment_info.end_time);
      data.appointment_info.age = this.global.ageCalculation(data.appointment_info.date_of_birth);
      data.appointment_info.Name = data.appointment_info.name +' '+ data.appointment_info.lastname;
      if(data.appointment_info.family_user_id != 0){
        data.appointment_info.age = this.global.ageCalculation(data.appointment_info.family_dob);
        data.appointment_info.Name = data.appointment_info.family_member_name ;
        data.appointment_info.gender = data.appointment_info.family_gender ;
        data.appointment_info.profile_img = data.appointment_info.family_profile_img ;
      }
    }

    if(data.pass_info.id){

    }

if(this.userDetail.role_id ==4){
  if(data.content_category == 1){
    url = '/classes-detail';
    detail = {'id' : details.class_id ,'currentdate': details.select_dt, 'schedule_id' : details.schedule_id, 'backurl' :this.CurrentUrl};
  } else  if(data.content_category == 2){
    url = '/booking-detail';
    localStorage.setItem('sw_AppointUrl','/appointment')
    localStorage.setItem('sw_Booking_detail',<any> JSON.stringify(data.appointment_info));
  } else  if(data.content_category == 3){
    url = '/workshop-detail';
    detail = {};
  } else  {
    return false;
  }
} else{
  if(this.userDetail.consent_status < 7){
    return false;
  } else{
    if(data.content_category == 1){
      url = '/classes-detail';
      detail = {'id' : details.class_id ,'currentdate': details.select_dt, 'schedule_id' : details.schedule_id, 'backurl' :this.CurrentUrl};
    } else  if(data.content_category == 2){
      url = '/booking-detail';
      localStorage.setItem('sw_AppointUrl','/appointments')
      localStorage.setItem('sw_Booking_detail',<any> JSON.stringify(data.appointment_info))
    } else  if(data.content_category ==3 ){
      url = '/workshops-detail';
      detail = {};
    } else  if(data.content_category == 4){
      url = '/pass-detail';
      detail =  {'id':data.pass_info.id ,'url':'/home','user_booking_id':data.pass_info.user_booking_id};
    } else  if(data.content_category == 5){
      url = '/workshops';
      detail = {};
    } else  if(data.content_category == 6){
      url = '/instructor-detail';
      detail = {};
    } else  if(data.content_category == 8 ){
      url = '/my-purchase';
      detail = {};
      } else  {
        return false;
      }
  }
  }
  this.route.navigate([url],{state:{Id : detail}});

  }

//onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount!=0 && this.NotificationDetail.length == 10) {
      this.pagecount++;
      this.getNotifiction();
    }
  }

  markRead(id){
    var detail ={ "notification_id":id};
    var url =  'superadmin/webservices/api/read_notification';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){   
      } else{
      }
    }))

  }
}

