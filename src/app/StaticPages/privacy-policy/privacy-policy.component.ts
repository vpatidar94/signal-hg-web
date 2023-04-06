import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

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
    var detail = "superadmin/Welcome/web_content/privacy-policies";
    this.commonservice.GetApi(detail).subscribe((( response : any) => {
    this.Description = response.content;    
    }))
  }

}

