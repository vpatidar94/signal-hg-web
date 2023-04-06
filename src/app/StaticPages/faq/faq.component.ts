import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public loginInfo: boolean ;
  public FaqList: any = [];

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    if(localStorage.getItem('sw_loginDetail')){
      this.loginInfo = true;
    }
  }
  
  ngOnInit() {
    this.getFaqList();
  }

  getFaqList(){
    var url = 'superadmin/webservices/api/faq';
    this.commonservice.GetApi(url).subscribe(((response : any) =>{
      if(response.status == 1){
        this.FaqList = response.data;
      }
    }))
  }
}
