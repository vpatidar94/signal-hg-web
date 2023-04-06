import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  public priceLIst: any = [];
  public baseUrl = this.commonservice.baseUrl;

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
}

  ngOnInit(): void {
    this.getPriceList();
  }

  getPriceList(){
    var url = 'superadmin/web/transaction/plans_list';
    this.commonservice.GetApi(url).subscribe(((response : any) =>{
      if(response.status == 1){
        this.priceLIst = response.data;
      }
    }))
  }
}
