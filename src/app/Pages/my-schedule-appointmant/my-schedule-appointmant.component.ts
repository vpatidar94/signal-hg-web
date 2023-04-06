import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-my-schedule-appointmant',
  templateUrl: './my-schedule-appointmant.component.html',
  styleUrls: ['./my-schedule-appointmant.component.scss']
})
export class MyScheduleAppointmantComponent implements OnInit {
  
  public businessDetail : any =[];
  public loading : boolean = true;
  public serviceList : any = [] ;

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
  }
 
  ngOnInit(): void {
    this.services_list();
  }

  services_list(){
    var detail = {"pageid":"1","business_id": this.businessDetail.business_id};
    var url = 'superadmin/webservices/instructor/service_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any ) => {
      if(response.status == 1){
        this.serviceList  = response.data;
      }
    }))
  }

  redirect(id){
    localStorage.setItem('sw_scduledeteail', <any>JSON.stringify(id))
    this.route.navigate(['/my-schedule-appointment-detail']);
  }
}
