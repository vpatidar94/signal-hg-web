import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router"; 
import { DataService } from  '../../Services/data.service';
import { Location } from '@angular/common';
declare var $;

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  public ProfileDetail : any =[];
  imgURL: any;
  public loading : boolean = true;
  public dob : any;  
  public gender : any;
  public navData : any = [];
  public Detail : any = [];
  public ID : any ;
  public businessDetail : any =[];

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService,  private location :Location) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.navData = this.location.getState();
    if(this.navData.Id){
      this.Detail = this.navData;
      localStorage.setItem('sw_Client_ID', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_Client_ID')){
        this.ID = JSON.parse(localStorage.getItem('sw_Client_ID'));
      }
    } else {      
      if(localStorage.getItem('sw_Client_ID')){
        this.ID = JSON.parse(localStorage.getItem('sw_Client_ID'));
      }
    } 
   }



  ngOnInit(): void {
    this.getProfile ();
  }


  getProfile (){
    var detail = {"customer_id":this.ID};
    var url = 'superadmin/webservices/instructor/get_user_profile';
    this.commonservice.PostApi(detail,url).subscribe((response : any) =>{
      if(response.status == 1){
      this.dob = response.data.date_of_birth ;      
      this.ProfileDetail= response.data;
      this.gender = this.ProfileDetail.gender;
      this.ProfileDetail.mobile1 = this.ProfileDetail.country_code +'  ' + this.ProfileDetail.mobile;    
      this.loading = false;
      } else{
        this.loading = false;
      }
    })
  }

  back(){
    this.route.navigate([this.Detail.url]);
  }
}
