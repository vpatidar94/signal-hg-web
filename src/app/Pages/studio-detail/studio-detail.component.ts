import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { Location } from '@angular/common';
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-studio-detail',
  templateUrl: './studio-detail.component.html',
  styleUrls: ['./studio-detail.component.scss']
})
export class StudioDetailComponent implements OnInit {


  public businessDetail : any =[];
  public purchaseDetail : any = [];
  public attandanceDetail : any = [];
  public loading : boolean = true;
  public ClassDetail : any =[]; 
  public WaitingDetail : any =[]; 
  public purchaseProduct : any =[];
  public userDetail : any =[];
  public navData : any =[];
  public ID : any;
  public addresslength : any;
  public backurl :any ;
  //public minValue : any = new Date();


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService, private location :Location) { 
    this.userDetail= JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.navData =this.location.getState();
    if(this.navData.Id){
      localStorage.setItem('sw_DetailId', JSON.stringify(this.navData.Id));
      this.backurl = this.navData.backurl;
    } else {
      this.backurl = '/studio';
    }
    if(this.route.getCurrentNavigation().extras.state ==  undefined) {    
      if(localStorage.getItem('sw_DetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_DetailId'));
      }
    } else {      
      if(localStorage.getItem('sw_DetailId')){
        this.ID= JSON.parse(localStorage.getItem('sw_DetailId'));
      }
    } 
    this.getBusinessDetail();
  }

  ngOnInit(): void {
    $('.box').hide(); //hide
    $('.my-classes').show(); //set default class to be shown here, or remove to hide all
  }

  showHide(event){
    $('.box').hide(); //hide all with .box class
    $('.' +event.target.value).show(); //show selected option's respective element
  }

  getBusinessDetail(){
    var detail ={ "business_id":this.ID};
    var url;
    if(this.userDetail.role_id == '3'){
      url = 'superadmin/webservices/api/get_business_detail' ;
    } else {
      url = 'superadmin/webservices/instructor/get_business_detail' ;
    }
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
       this.businessDetail = response.data;
       var detail = {"business_id":response.data.business_id,'business_name':response.data.business_name, 'address':response.data.address,'logo':response.data.logo,'business_img':response.data.business_img,'email':response.data.email,'latitude':response.data.latitude,'longitude':response.data.longitude,'business_phone':response.data.business_phone,'favourite':response.data.favourite,'video_access':response.data.video_access};
       localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(detail));
       this.addresslength = this.businessDetail.address.length;
       this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  addFav(id,status){
    this.loading = true;
     var detail ={  "service_type":"1",   "service_id":id,   "status":status};
     var url = 'superadmin/webservices/api/favourite';
     this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getBusinessDetail();
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
  }

  redirect(url){
    localStorage.setItem('sw_BackClass','/studio-detail');
    this.route.navigate([url]);
  }
}


