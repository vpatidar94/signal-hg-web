import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from  '../../Services/data.service';

@Component({
  selector: 'app-my-workout',
  templateUrl: './my-workout.component.html',
  styleUrls: ['./my-workout.component.scss']
})
export class MyWorkoutComponent implements OnInit {

  public loading:boolean = true;
  public workoutList:any = [];
  public currentUrl:any;
  public msg:any ='';

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.currentUrl = this.route.url;
  }

  ngOnInit(): void {
    this.getworkout();    
  }

  getworkout(){
    var url;
    if(this.currentUrl == '/workout'){
      url = "superadmin/webservices/api/workout_category";
    } else {    
      url = "superadmin/webservices/instructor/workout_category";
    }
    this.commonservice.GetApi(url).subscribe(((response :any)=>{
      if(response.status == 1){
        this.workoutList = response.data;
        this.loading = false;
      } else {
        this.msg = response.message;
        this.loading = false;
      }
    }))
  }

  redirect(id){
    localStorage.setItem('sw_workoutId',id);
    if(this.currentUrl == "/my-library"){
      this.route.navigate(['/my-library-detail']);
    } else {
      this.route.navigate(['/workout-detail']);
    }
  }

}
