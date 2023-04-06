import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

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
     var detail =  "superadmin/Welcome/web_content/term-and-condition";
      this.commonservice.GetApi(detail).subscribe((( response : any) => {
        this.Description =response.content;   
      }))
  }

}

