import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-my-schedule-class',
  templateUrl: './my-schedule-class.component.html',
  styleUrls: ['./my-schedule-class.component.scss']
})
export class MyScheduleClassComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = true;
  public AvailableList: any = [];

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
  }
 
  ngOnInit(): void {
    this.getSchedule();
  }

  changeStatus1(event,items,tt){

  }

  getSchedule(){
    var detail = {"business_id":this.businessDetail.business_id,"service_type": "2",
   // "service_id": "2" 
    };
    var url = 'superadmin/webservices/instructor/view_my_schedule';
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        
       this.AvailableList = response.data;
        this.loading = false;
      } else{
        this.loading = false;
      }

    }))
  }
}
