import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  public loading : boolean = true;
  public navData : any =[];
  public ID : any;
  public businessDetail : any =[];
  public clientData : any = [];

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_clientId', JSON.stringify(this.navData.Id));
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_clientId')){
        this.ID= JSON.parse(localStorage.getItem('sw_clientId'));
      }
    } else {      
      if(localStorage.getItem('sw_clientId')){
        this.ID= JSON.parse(localStorage.getItem('sw_clientId'));
      }
    } 
  }

  ngOnInit(): void {
    this.getClientDetail();
  }

  getClientDetail(){
    var today = new Date();
    var currYear = today.getFullYear();
    var detail = {'id': this.ID};
    var url = 'superadmin/webservices/instructor/client_details';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        var birthyear = response.data.date_of_birth.split(' ');
        var age = currYear - birthyear[birthyear.length-1];
        response.data.age = age;
        this.clientData = response.data;
        this.loading = false;
      } else {
        this.loading = false;
      }
    }))
  }
}
