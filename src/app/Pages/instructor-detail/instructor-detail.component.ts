import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss']
})
export class InstructorDetailComponent implements OnInit {

  public navData : any =[];
  public ID : any;
  public StaffDetail : any =[];
  public businessDetail : any =[];
  public loading : boolean = true;
  public Userdetail : any =[];

  constructor(private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService, private location :Location) {
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.Userdetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_StaffId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_StaffId')){
        this.ID= JSON.parse(localStorage.getItem('sw_StaffId'));
      }
    } else {      
      if(localStorage.getItem('sw_StaffId')){
        this.ID= JSON.parse(localStorage.getItem('sw_StaffId'));
      }
    } 
   }

  ngOnInit(): void {
    this.getStaffList();
  }

  getStaffList(){
    var detail ={ "user_id":this.ID};
    var url = 'superadmin/webservices/api/instructor_details';
    this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
      if(response.status == 1){
        this.StaffDetail=response.data; 
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

}
