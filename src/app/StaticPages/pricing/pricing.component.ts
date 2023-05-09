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
    // var url = 'superadmin/web/transaction/plans_list';
    // this.commonservice.GetApi(url).subscribe(((response : any) =>{
    //   if(response.status == 1){
    //     this.priceLIst = response.data;
    //   }
    // }))
    this.priceLIst = [
      {
        "plan_id": "S7MytFIyVLIGAA==",
        "plan_name": "Single Business User",
        "amount": "25.00",
        "max_users": "1",
        "plan_type": "Monthly"
      },
      {
        "plan_id": "S7MytFIyUrIGAA==",
        "plan_name": "2-5 Business Users",
        "amount": "75.00",
        "max_users": "5",
        "plan_type": "Monthly"
      },
      {
        "plan_id": "S7MytFIyVrIGAA==",
        "plan_name": "6-10 Business Users",
        "amount": "150.00",
        "max_users": "10",
        "plan_type": "Monthly"
      },
      {
        "plan_id": "S7MytFIyUbIGAA==",
        "plan_name": "11-20 Business Users",
        "amount": "250.00",
        "max_users": "20",
        "plan_type": "Monthly"
      },
      {
        "plan_id": "S7MytFIyVbIGAA==",
        "plan_name": "20+ Business Users",
        "amount": "250.00",
        "max_users": "100",
        "plan_type": "Monthly"
      },
      {
        "plan_id": "S7MytFKyVLIGAA==",
        "plan_name": "Zero fees beta subscriptions",
        "amount": "0.00",
        "max_users": "1",
        "plan_type": "Monthly"
      }
    ]
  }
}
