import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss']
})
export class StudioComponent implements OnInit {

  public StudioDetail :any =[];
  public loading : boolean = true;
  public userDetail : any = [];
  public backurl : any ;
  public eventDetail_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay: false,
    dots:true,
    mouseDrag: true, 
    navText: ['', ''],
    responsive: {  
      0: {
        items: 3,
        loop: true,
      },
      400: {
        items: 3,
        loop: true,
      },
      740: {
        items: 3,
        loop: true,
      },     
      1000: {
        items: 3,
        loop: true,
      }
    },
    nav: true
  }

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) {
    this.userDetail = JSON.parse(localStorage.getItem('sw_loginDetail'));
    if(localStorage.getItem('sw_subscription')){
      Swal.fire({
        title:'Plan Purchse ?',
        text: 'Do you want to Purchase Plan from new studio?.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.value) {
          localStorage.removeItem('sw_subscription');
          this.route.navigate(['/studio-membership-plan']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem('sw_subscription');
        }
      })
    } 
    this.getStudio();
    this.backurl = this.route.url;  
  }

  ngOnInit(): void {
  }

  getStudio(){
    var url;
    var detail = {"pageid":"1" ,'lat':this.userDetail.lat,'lang':this.userDetail.lang};
    if(this.userDetail.role_id == 3){
      url =  'superadmin/webservices/api/my_studio_list' ;
      this.commonservice.PostApi( detail,url ).subscribe(((response : any)=> {
        if(response.status == 1){
          this.StudioDetail = response.data;
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    } else{
      url = 'superadmin/webservices/instructor/my_studio_list';
      this.commonservice.PostApi( detail ,url).subscribe(((response : any)=> {
        if(response.status == 1){
          this.StudioDetail = response.data;
          this.loading = false;
        } else{
          this.loading = false;
        }
      }))
    }

  }

  redirectUrl(businessId){
    //if(this.userDetail.role_id == 3){
      this.route.navigate(['/studio-detail'],{state:{Id : businessId,backurl:this.backurl}});
    // } else{
    //   this.route.navigate(['/studio-Detail'],{state:{Id : businessId}});
    // }
  }
 
  addFav(id,status){
    this.loading = true;
    var detail ={  "service_type":"1",   "service_id":id,   "status":status};
    var url = 'superadmin/webservices/api/favourite';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
     if(response.status == 1){
       this.global.successAlert(response.message);
       this.getStudio();
     } else{
       this.global.dangerAlert(response.message);   
       this.loading = false; 
     }
    }))
  }
}
