import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;


@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

 
  public businessDetail : any =[];
  public userDetail : any = [];
  public geoCoder : any;
  public zoom : any;
  public address:any;
  public loading : boolean =false;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService,
   // private mapsAPILoader: MapsAPILoader,    private ngZone: NgZone
    ) {
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));

  }

  ngOnInit(): void {
    // this.mapsAPILoader.load().then(() => {
    // //var address = 'https://maps.google.com/maps?q='+this.eventData.location+'&t=&z=15&ie=UTF8&iwloc=&output=embed';
    // this.geoCoder = new google.maps.Geocoder
    // })
  }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { 'lat': parseFloat(latitude), 'lng':parseFloat(longitude) } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 14;
  //         this.address = results[0].formatted_address;
  //        // window.location.href = 'https://maps.google.com/maps?q='+this.address+'&t=&z=15&ie=UTF8&iwloc=&output=embed'

  //         window.location.href = 'https://www.google.com/maps/@'+latitude+','+ longitude +','+this.zoom+'z?hl=en';
  //         //$('#googlemaplc').trigger('click'); https://www.google.com/maps/@44.9772243,-93.2125335,14z?hl=en
  //       } else {
  //        this.global.dangerAlert('No results found');
  //       }
  //     } else {
  //       this.global.dangerAlert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }

  addFav(id,status){
    this.loading = true;
     var detail ={  "service_type":"1",   "service_id":id,   "status":status};
     var url = 'superadmin/webservices/api/favourite';
     this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getBusiness();
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
     }))
   }

   getBusiness(){
    var detail ={ "business_id":this.businessDetail.business_id};
    var url;
    if(this.userDetail.role_id == '3'){
      url = 'superadmin/webservices/api/get_business_detail' ;
    } else {
      url = 'superadmin/webservices/instructor/get_business_detail' ;
    }    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){
       this.businessDetail = response.data;
       var detail = {"business_id":response.data.business_id,'business_name':response.data.business_name, 'address':response.data.address,'logo':response.data.logo,'business_img':response.data.business_img,'email':response.data.email,'latitude':response.data.latitude,'longitude':response.data.longitude,'business_phone':response.data.business_phone,'favourite':response.data.favourite,'video_access':response.data.video_access};
       localStorage.setItem('sw_BusinessDetail', <any>JSON.stringify(detail));
       this.loading = false;
      } else{
        this.loading = false;
      }
    }))
   }
}
