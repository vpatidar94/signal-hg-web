import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';
declare var $;

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {


  public videoList :any =[];
  public loading : boolean = true;
  public businessDetail : any =[];
  public pagecount:any =1;
  public SelectedVideo:any =[];
  public currentUrl :any;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.currentUrl = this.route.url;
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    window.scroll(0,0);
  }

  ngOnInit(): void {  
    this.getVideo();
  }

  getVideo(){
    var url;
    if(this.currentUrl != "/upload-video"){
     url = "superadmin/webservices/api/business_video";
    } else {
     url = "superadmin/webservices/instructor/business_video";
    }
    var detail={ "business_id":this.businessDetail.business_id, 
    "pageid": this.pagecount ,"category":'' , "subcategory":''};
    this.commonservice.PostApi(detail,url).subscribe(((response :any)=>{
      if(response.status == 1){
        this.videoList = response.data;
        this.loading = false;
      } else {
        this.loading = false;
      }
    }))
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

  getSelected(event){ 
    var arr=[];
    if(event.target.checked){
      this.SelectedVideo.push(event.target.id);
    } else {
      this.SelectedVideo.filter(function (el){
        if (el != event.target.id){
          arr.push (el);
        }
      })
      this.SelectedVideo = arr;
    }
    
  }

  onSubmit(){
    var videos ='';
    this.SelectedVideo.filter(function (el){
      if(videos == ''){
        videos = el;
      } else {
        videos = videos +","+el;
      }
    })
    var detail={ "business_id":this.businessDetail.business_id, "workout_id": localStorage.getItem('sw_workoutId'), "video_id": videos};
    var url="superadmin/webservices/instructor/add_business_library";
    this.commonservice.PostApi(detail,url).subscribe(((response : any)=>{
      if(response.status == 1){
        this.global.successAlert(response.message);
        this.route.navigate(['/my-library-detail']);
      } else {
        this.global.dangerAlert(response.message);
      }
    }))
  }
  
}





 

// var _gaq = _gaq || [];
//   _gaq.push(["_setAccount", "UA-36251023-1"]);
//   _gaq.push(["_setDomainName", "jqueryscript.net"]);
//   _gaq.push(["_trackPageview"]);

//   (function () {
//       var ga = document.createElement("script");
//       ga.type = "text/javascript";
//       ga.async = true;
//       ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
//       var s = document.getElementsByTagName("script")[0];
//       s.parentNode.insertBefore(ga, s);
// })();