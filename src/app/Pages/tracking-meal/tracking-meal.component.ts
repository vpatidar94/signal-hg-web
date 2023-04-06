import { Component, OnInit , ViewChild, ElementRef  } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';

@Component({
  selector: 'app-tracking-meal',
  templateUrl: './tracking-meal.component.html',
  styleUrls: ['./tracking-meal.component.scss']
})

export class TrackingMealComponent implements OnInit {

  // public businessDetail : any =[];
  // public loading : boolean = false;
  public url ="https://signalhg.consagous.co.in/superadmin/uploads/video/1628589769alb_vid1001_1080p.mp4"
  
  constructor(private route: Router,  public commonservice: DataService ) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));

  }

  ngOnInit(): void {
    this.getworkoutVideo();

  }

  // redirect(url){
  //   localStorage.setItem('sw_BackClass','/studio-detail');
  //   this.route.navigate([url]);
  // }
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;

  isPlay: boolean = false;
  public videoList :any =[];
  public businessDetail : any =[];


  getworkoutVideo(){
    var url, detail ={};
      url = "superadmin/webservices/instructor/business_library";
      detail={ "business_id":this.businessDetail.business_id, "workout_id": localStorage.getItem('sw_workoutId')};
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){
        this.videoList=response.data;
      } else {
      }
    })
  }
 
}
