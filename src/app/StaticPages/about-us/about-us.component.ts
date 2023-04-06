import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  public loginInfo: boolean ;
  public Description : any = [];

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    if(localStorage.getItem('sw_loginDetail')){
      this.loginInfo = true;
    }
  }
  
  ngOnInit() {
    this.getContent();
  }

  getContent(){
    var detail =  'superadmin/Welcome/web_content/about-us';
    this.commonservice.GetApi(detail).subscribe((( response : any) => {
      this.Description =response.content;    
    }))
  }
}

