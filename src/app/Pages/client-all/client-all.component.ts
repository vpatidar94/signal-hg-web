import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-all',
  templateUrl: './client-all.component.html',
  styleUrls: ['./client-all.component.scss']
})
export class ClientAllComponent implements OnInit {

  public loading : boolean = true;
  public businessDetail : any = [];
  public search_text : any;
  public clientDetail : any = [];

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));

  }

  ngOnInit(): void {
    this.ClientList();
  }
  
  ClientList(){
    var today = new Date();
    var currYear = today.getFullYear();
    // var url = 'superadmin/webservices/instructor/client_list';
    // var detail = { "pageid":"1", "business_id":this.businessDetail.business_id, "search_val":this.search_text}
    var url = 'superadmin/webservices/instructor/business_customer';
    var detail = { "pageid":"1", "business_id":this.businessDetail.business_id}

    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        var self = this;
        // response.data.filter(function (el){
        //   el.age = self.global.ageCalculation(el.date_of_birth);
        // })
        self.clientDetail = response.data;
        self.loading = false;      
      } else{
        this.clientDetail =[];
        this.loading = false; 
      }
    }))
  }

  redirectUrl(Id){
    localStorage.setItem('sw_clientId',Id);
    this.route.navigate(['/nutrition']);
    // this.route.navigate(['/customer-profile'],{state:{Id : Id, url:'/client'}});
    //this.route.navigate(['/services'],{state:{Id : Id}});
  }
  
  reset(){
    this.search_text ='';
    this.ClientList();
  }

  redirect(){
  }
}
