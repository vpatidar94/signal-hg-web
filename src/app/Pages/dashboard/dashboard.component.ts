import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';  
import { DataService } from  '../../Services/data.service';
import { Options } from 'ng5-slider';
import { GlobalService } from '../../Services/global.service';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public UserInfo : any =[];
  public dashboardDetail : any =[];
  public loading : boolean = true;
  public search_text: any;
  public categoryList : any =[];
  public subcategoryList : any =[];
  public subcategoryText : any;
  public categoryText : any;
  public searchText : any;
  public selectedItemsList:  any = [];
  public distanceMode: boolean = false;
  public slidervalue: any = 0;
  public sliderhighValue: any =500;
  public slideroptions: Options = {
    floor: 0,
    ceil: 500,
    showSelectionBar: true,
    minLimit:5,
  };

  public eventDetail_Options: OwlOptions = {
    loop:true,
    margin:10,
    autoplay:false, 
    mouseDrag: true, 
    navText: ['', ''],
    responsive:{
      0:{
        items:1,
        nav:false,
        loop:true
      },
      600:{
        items:3,
        nav:false,
        loop:true
      },
      1000:{
        items:4,
        nav:false,
        loop:true
      },
      1280:{
        items:4,
        nav:false,
        loop:true
      }
    }
  //   responsive: {  
  //     0: {
  //       items: 5,
  //       loop: true,
  //     },
  //     400: {
  //       items: 5,
  //       loop: true,
  //     },
  //     740: {
  //       items: 5,
  //       loop: true,
  //     },     
  //     1000: {
  //       items: 5,
  //       loop: true,
  //     }
  //   },
  }


  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute, public commonservice: DataService) { 
    this.UserInfo = JSON.parse(localStorage.getItem('sw_loginDetail'));
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
  }

  ngOnInit(): void {
    this.getDashboardDetail();
    this.getCategories();
  }

  getDashboardDetail(){
    var detail ={ "pageid":"1",   "lat":this.UserInfo.lat,    "lang":this.UserInfo.lang };
    var url = 'superadmin/webservices/api/user_dashboard';
    this.commonservice.PostApi( detail,url).subscribe(((response: any)=> {
      if(response.status ==1){ 
        this.dashboardDetail = response.data;
        this.loading = false;
      } else{
        this.loading = false;
      }
    }))
  }

  redirectUrl(businessId){
    localStorage.setItem('sw_detailBack', '/home');
    this.route.navigate(['/detail'],{state:{Id : businessId}});
  }

  addFav(id,status){
    this.loading = true;
    var detail ={  "service_type":"1",   "service_id":id,   "status":status};
    var url = 'superadmin/webservices/api/favourite';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getDashboardDetail();
      } else{
        this.global.dangerAlert(response.message);    
        this.loading = false;
      }
    }))
  }

  redirecrUrl1(detail){  
    this.route.navigate(['/allStudio'],{state:{Studio : detail}});
  }

  searchHome(){
    this.loading = true; 
    var detail ={ "pageid":"1",   "search_text":this.searchText,   "category":'',   "subcategory":'',   "lat":"",
    "lang":"",   "distance":'',   "business_id":""};
    var url = 'superadmin/webservices/api/get_business';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) =>  {
      if(response.status == 1){
        response.data.total_count = response.total_count;
        this.route.navigate(['/search'],{state : {'SerchData': response.data}});
        this.loading = false;
      } else{
        this.global.dangerAlert('Studio Not Found');
        this.loading = false;
      }
    })) 
  }

  filterHome(){
    var lat,lang;
    this.loading = true;
    if(this.distanceMode != true){
      this.sliderhighValue = lat=lang ='';
    } else{
      lat = this.UserInfo.lat;
      lang = this.UserInfo.lang;
    }
    // if(this.selectedItemsList){
    //   if(this.selectedItemsList.length!=0){
    //     this.subcategoryText.filter(function (el){
    //       if(subcatText){
    //         subcatText =  el.id +","+ subcatText;
    //        }
    //        else{
    //         subcatText =  el.id;  
    //        }
    //     })
    //     this.subcategoryText = subcatText;
    //   }
    //  }
    var detail ={ "pageid":"1",   "search_text":'',   "category":this.categoryText,   "subcategory":this.selectedItemsList,   "lat":lat,
    "lang":lang,   "distance":this.sliderhighValue,   "business_id":''};
    var url = 'superadmin/webservices/api/get_business';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) =>  {
      if(response.status == 1){
        response.data.total_count = response.total_count;
        this.route.navigate(['/search'],{state : {'SerchData': response.data}});
        this.loading = false;
      } else{
        this.global.dangerAlert('Studio Not Found');
        this.loading = false;
      }
    })) 
  }

  getValue(event){
    this.distanceMode = event.target.checked;
  }

  getCategories(){
    this.loading = true;
    var detail = {  "type":"2",    "subcat":this.categoryText,    "business_id":""};
    var url = 'superadmin/webservices/api/get_categories';
    this.commonservice.PostApi(detail,url).subscribe(((response : any) => {
      if(response.status == 1){ 
        if(this.categoryText){
          response.data.filter(function (el){
            el.isChecked = false;
          })
          this.subcategoryList = response.data;
          this.loading = false;
        } else{
          this.categoryList = response.data;
          this.categoryText = response.data[0].id;
          this.getCategories();
          this.loading = false;
        }  
      } else {

      }
    }))
  }

  changeSelection() {
    var subcatText;
    // this.selectedItemsList = this.subcategoryList.filter((value, index) => {
    //   return value.isChecked
    // });
    this.subcategoryList.filter((value, index) => {
      if(value.isChecked){
        if(subcatText){
          subcatText =  value.id +","+ subcatText;
        }
        else{
          subcatText =  value.id;  
        }
      }
    });
    this.selectedItemsList = subcatText;
  } 
}
