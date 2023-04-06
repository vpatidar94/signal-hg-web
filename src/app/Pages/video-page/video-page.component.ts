import { Component, OnInit , ViewChild, ElementRef } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

declare var $;

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit {

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;

  public videoList :any =[];
  public loading : boolean = true;
  public currentUrl :any;
  public businessDetail : any =[];
  public pagecount:any =1;
  public categoryList:any =[];
  public subcategoryList:any =[];
  public selectedCategory:any ='';
  public selectedsubCategory:any ='';
  public filterView :boolean =false ;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.currentUrl = this.route.url;
    if(this.currentUrl != '/workout-detail'){
      this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    }
    window.scroll(0,0);
  }

  ngOnInit(): void {
    if(this.currentUrl == "/my-library-detail" || this.currentUrl == "/workout-detail"){
      this.getworkoutVideo();
    } else {
      this.getCategory();
      this.getVideo();
    }
  }

  getVideo(){
    var url;
    if(this.currentUrl == "/my-videos"){
      url = "superadmin/webservices/instructor/business_video";  
    } else{
      url = "superadmin/webservices/api/business_video";  
    }
    var detail={ "business_id":this.businessDetail.business_id,"pageid": this.pagecount ,"category":this.selectedCategory , "subcategory":this.selectedsubCategory};
    this.commonservice.PostApi(detail,url).subscribe(((response :any)=>{
      if(response.status == 1){
        this.videoList = response.data;
        this.loading = false;
      } else {
        this.loading = false;
      }
    }))
  }

  getworkoutVideo(){
    var url, detail ={};
    if(this.currentUrl == "/workout-detail" ){
      url = "superadmin/webservices/api/business_library_by_category";
      detail={ "pageid":'1', "category_id": localStorage.getItem('sw_workoutId')};
    } else {
      url = "superadmin/webservices/instructor/business_library";
      detail={ "business_id":this.businessDetail.business_id, "workout_id": localStorage.getItem('sw_workoutId')};
    }
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){
        this.videoList=response.data;
        this.loading = false;
      } else {
        this.loading = false;
      }
    })
  }

  removeWorkoutVideo(id){
    var detail={ "business_id":this.businessDetail.business_id, "workout_id": localStorage.getItem('sw_workoutId'),"video_id": id};
    var url = "superadmin/webservices/instructor/remove_business_library";
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.getworkoutVideo();
        this.loading = false;
      } else {
        this.global.dangerAlert(response.message);
        this.loading = false;
      }
    }) 

  }

  playvideo(id){
    let audioPlayer = < HTMLMediaElement>document.getElementById(id);
    audioPlayer.play();  
    var playimg = "#playImg"+id;
    var pushImg = "#pushImg"+id;
    $(playimg).hide();
    $(pushImg).show();
  }
  
  pushvideo(id){
    let audioPlayer= < HTMLMediaElement>document.getElementById(id);
    audioPlayer.pause(); 
    var playimg = "#playImg"+id;
    var pushImg = "#pushImg"+id; 
    $(playimg).show();
    $(pushImg).hide();
  }

  getCategory(){
    if(this.currentUrl == '/videos'){
      var url ="superadmin/webservices/api/business_category/" + this.businessDetail.business_id;
    } else {
      var url ="superadmin/webservices/instructor/business_category/" + this.businessDetail.business_id;
    }
    this.commonservice.GetApi(url).subscribe(((response : any) => {
      if(response.status == 1){
        this.categoryList =response.data;
      } else {

      }
    }))
  }

  getCategories(){ 
    var id = this.selectedCategory,arr =[];
    if(this.selectedCategory == ''){
      this.selectedsubCategory = '';
    } else {
      this.categoryList.filter(function (el){
        if(el.id == id){
         arr= el.sub_category;
        }
      })
      this.subcategoryList = arr; 
    }
  }

  filter(){
    this.selectedCategory ='';
    this.selectedsubCategory ='';
    this.getVideo();
    this.filterView= false;
  }

  redirect(){
    if(this.currentUrl == '/my-library-detail'){
      this.route.navigate(['/my-library'])
    } else if(this.currentUrl == '/workout-detail'){
      this.route.navigate(['/workout']);
    } else {
      this.global.backStep();
      //this.route.navigate(['/studio-detail']);
    } 
  }
}



