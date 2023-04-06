import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

  public feedList: any =[];
  public comment: any;
  public pageCount: any =1;
  public loading : boolean = true;

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) {
    this.getFeeds();
   }

  ngOnInit(): void {
  }

  getFeeds(){
    var url = "superadmin/webservices/api/get_newsfeed_list";
    this.commonservice.GetApi(url).subscribe((response : any) => {
      if(response.status == 1){
        this.feedList=response.data;
        this.loading = false;
      } else {
        this.loading = false;
      }
    })
  }

  redirect(items){
    localStorage.setItem('sw_newsfeed',JSON.stringify(items));
    this.route.navigate(['/news-feed-details']);
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
