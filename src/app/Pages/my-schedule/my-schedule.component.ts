import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss']
})
export class MyScheduleComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = true;
  public StudioDetail : any = [] ;
  public userDetail : any = [];

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    //this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.StudioList();
  }
  
  ngOnInit(): void {
  }

  StudioList(){
    var detail = {"pageid":"1"  ,'lat':this.userDetail.lat,'lang':this.userDetail.lang};
    var url = 'superadmin/webservices/instructor/my_studio_list';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.StudioDetail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  redirectUrl(businessId){
    this.route.navigate(['/my-schedule-detail'],{state:{Id : businessId}});
  }
}
