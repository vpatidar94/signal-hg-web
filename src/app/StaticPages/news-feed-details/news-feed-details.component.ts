import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-news-feed-details',
  templateUrl: './news-feed-details.component.html',
  styleUrls: ['./news-feed-details.component.scss']
})
export class NewsFeedDetailsComponent implements OnInit {

  public feedList: any = {};
  public userInfo:any={};
  public commentList: any = [];
  public comment: any;
  public pagecount: any = 1;
  public throttle              = 100;
  public scrollDistance        = 1;
  public scrollUpDistance      = 1.5; 
  public direction             = '';
  public dataCount : any;
  public loading : boolean = true;

  constructor(public global :GlobalService,private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    window.scroll(0,0);
    this.feedList=JSON.parse(localStorage.getItem('sw_newsfeed'));
    this.userInfo =JSON.parse(localStorage.getItem('sw_loginDetail'));
  }

  ngOnInit(): void {
    this.getComment(this.feedList.id);
  }

  getFeeds(){
    var url = "superadmin/webservices/api/get_newsfeed_list/"+this.feedList.id;
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        this.feedList=response.data;
        localStorage.setItem('sw_newsfeed',JSON.stringify(response.data));
        this.loading = false;
      } else {
        this.loading = false;
      }
    })
  }

  getComment(id){
    var detail={
      "user_id":JSON.parse(localStorage.getItem('sw_parentId')),
      "newsfeed_id":id,
      "page_no": this.pagecount
    };
    var url = "superadmin/webservices/api/get_newsfeed_comments_list";
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){
        var self =this;
        response.data.filter(function(el){
          el.newtime = self.global.timeConvert(self.global.toTimestamp(el.added_date));
        })
        if(this.pagecount == 1){
          this.commentList = response.data;
        } else {
          this.commentList =this.commentList.concat(response.data);
        }
        this.loading = false;

      } else{ 
        this.dataCount = 0;
        this.loading = false;
      }
    })
  }

  onScroll() {
    if(this.dataCount!=0 && this.commentList.length == 20) {
      this.pagecount++;
      this.getComment(this.feedList.id);
    }
  }

  postComment(id){
    this.loading = true;
    var detail={
      "user_id":JSON.parse(localStorage.getItem('sw_parentId')),
      "newsfeed_id":id,
      "comments":this.comment
    };
    var url = "superadmin/webservices/api/newsfeed_comments";
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){
        this.comment='';
        this.getComment(this.feedList.id);
        this.getFeeds();
        this.loading = false;
      } else {
        this.loading = false;
      }
    })
  }

  postLike(id,like){
    this.loading = true;
    var detail={
      "user_id":JSON.parse(localStorage.getItem('sw_parentId')),
      "newsfeed_id":id,
      "is_like":like
    };
    var url = "superadmin/webservices/api/newsfeed_like";
    this.commonservice.PostApi(detail,url).subscribe((response : any) => {
      if(response.status == 1){    
        this.getFeeds();
        this.loading = false;
      } else {
        this.loading = false;
      }
    })
  }
}
