import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-prefrence',
  templateUrl: './prefrence.component.html',
  styleUrls: ['./prefrence.component.scss']
})
export class PrefrenceComponent implements OnInit {

  public loading : boolean = false;
  public notifications : any = [];
  
  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  var data = JSON.parse(localStorage.getItem('sw_loginDetail'));
  this.notifications = data.notification;
  }

  ngOnInit(): void {
  }

  changePreference(event, name){
    var status,
    appStatus = this.notifications.app_notification,
    aStatus = this.notifications.alerts,
    eStatus = this.notifications.email,
    pStatus = this.notifications.phonecall,
    sStatus = this.notifications.sms;
    if(event.target.checked == true){
      status = 1;
    } else{
      status =  0;
    }
   if(name == "app_notification"){
     appStatus = status;
   } else if(name == "sms"){
     sStatus = status;
   } else if(name == "alerts"){
     aStatus = status;
   } else if(name == "email"){
     eStatus = status;
   } else{
     pStatus = status;
   }
   var url =  'superadmin/webservices/api/notification_on_off';
    var detail ={   "app_notification":appStatus,      "alerts":aStatus, "email":eStatus,      "sms":sStatus,      "phonecall":pStatus}
    this.commonservice.PostApi(detail,url).subscribe(((response: any) => {
      if(response.status == 1){
        this.notifications =response.data.notification;
        localStorage.setItem('sw_loginDetail', JSON.stringify(response.data));
        this.global.successAlert(response.message);
      } else {
        this.global.dangerAlert(response.message);
      }
    }))
  }
}

