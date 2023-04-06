import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-client-services-detail',
  templateUrl: './client-services-detail.component.html',
  styleUrls: ['./client-services-detail.component.scss']
})
export class ClientServicesDetailComponent implements OnInit {


  public businessDetail : any =[];
  public navData : any;
  public ID : any;
  public serviceData : any = [];
  public selectedItemsList : any =[];
  public loading : boolean = true;
  public userdetail : any = [];

  constructor(private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService,private location : Location) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userdetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    var CurrentUrl = this.route.url;  
    //localStorage.setItem('sw_backUrl', CurrentUrl) ; 
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_serviceId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_serviceId')){
        this.ID= JSON.parse(localStorage.getItem('sw_serviceId'));
      }
    } else {      
      if(localStorage.getItem('sw_serviceId')){
        this.ID= JSON.parse(localStorage.getItem('sw_serviceId'));
      }
    }
    this.getserviceDetails(); 
  }

  ngOnInit(): void {
  }

  getserviceDetails(){
    var detail ={ "business_id":this.businessDetail.business_id,    "service_id":this.ID};
    var url ;
    if(this.userdetail.role_id == 3){
      url = 'superadmin/webservices/api/services_details';
    } else {
      url = 'superadmin/webservices/instructor/services_details';
    }
    this.commonservice.PostApi(detail ,url).subscribe(((response : any) => {
      if(response.status == 1){
        //response.data.service_category.filter(function (el){
          // response.data.service_category[0].isChecked = false;
        //})
        this.serviceData = response.data[0];
        localStorage.setItem('sw_serviceName',(this.serviceData.service_name));   

        this.loading = false;
        // console.log(this.serviceData);
      } else{
        this.loading = false;
      }
    }))
  }
  
  changeSelection() {
    this.selectedItemsList = this.serviceData.service_category.filter((value, index) => {
      return value.isChecked
    });
  } 

  redirectUrl(id){
    localStorage.setItem('sw_service_StaffDetail',<any> JSON.stringify(id));
    this.route.navigate(['/book-appointment']);
  }
  
  redirectUrl1(url,id){
    this.route.navigate([url],{state:{Id : id}});
  }
}
