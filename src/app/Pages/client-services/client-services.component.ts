import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-client-services',
  templateUrl: './client-services.component.html',
  styleUrls: ['./client-services.component.scss']
})
export class ClientServicesComponent implements OnInit {

  public businessDetail : any = [];
  public loading : boolean = true;
  public pageCount :any = 1;
  public serviceDetail : any = [];
  public dataCount : any;
  public throttle              = 300;
  public scrollDistance        = 2;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public customerList : any = [];
  public userdetail : any = [];
  keyword = 'name';

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    localStorage.removeItem('sw_slectedCustomer');
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.userdetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
  }

  ngOnInit(): void {
    this.getServicetList();
  
  }

  getServicetList(){
    var detail = {   "pageid":this.pageCount ,"business_id":this.businessDetail.business_id}
    var url;
    if(this.userdetail.role_id == 3){
      url = 'superadmin/webservices/api/services_list';
    }  else {
      url = 'superadmin/webservices/instructor/services_list';
    }
    this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
      if(response.status == 1){
        // response.data.filter(function (el ){
        //   var service_category = (el.service_category).split(',');
        //   el.service_category = service_category ;
        // })
        if(this.pageCount == 1){        
          this.serviceDetail = response.data;
        } else {
          this.serviceDetail =this.serviceDetail.concat(response.data);
        }
        
        this.loading = false;
      } else{
        this.dataCount = 0;
        this.loading = false;
      }
    }))
  }

  redirectUrl(url,Id){
    if(this.userdetail.role_id == 4){
      if(localStorage.getItem('sw_slectedCustomer')){
        this.route.navigate([url],{state:{Id : Id}});
      } else{
        this.global.dangerAlert('Please select the customer');
      }
    } else {
      this.route.navigate([url],{state:{Id : Id}});
    }
  
  }
  
//onScroll function for scroll listing..of the event,...
  onScroll() {
    if(this.dataCount !=0 && this.serviceDetail.length == 10) {
      this.pageCount++;
      this.getServicetList();
    }
  }
 
  selectEvent(item) {
    this.customerList.filter(function (el){
      if(el.id == item.id){
        localStorage.setItem('sw_slectedCustomer',<any>JSON.stringify(el));
      }
    })
    // do something with selected item
  }

  getcustomerlist(val: string) {
    var today = new Date();
    var currYear = today.getFullYear();
    this.loading = true;
    var detail = {"pageid":1,"business_id":this.businessDetail.business_id,"search_val":val};
    var url = 'superadmin/webservices/instructor/search_customer_for_services';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {

    // var url = 'superadmin/web/studio/get_customer_list';
    // this.commonservice.GetApi(url).subscribe(((response : any) => {
      if(response.status == 1){
        var self = this;
        response.data.filter(function(el){
          if(el.date_of_birth){
            el.age = self.global.ageCalculation(el.date_of_birth);


            // var birthyear = el.date_of_birth.split('-');
            // var age = currYear - birthyear[0];
            // el.age = age;
          }       
        })
        this.customerList = response.data;
        this.loading = false;
      } else {
        this.customerList = [];
        this.loading = false;
      }
    }))
  }
  
  onFocused(e){
    // do something when input is focused
  }
  
  clear(){
    localStorage.removeItem('sw_slectedCustomer');
  }
}
