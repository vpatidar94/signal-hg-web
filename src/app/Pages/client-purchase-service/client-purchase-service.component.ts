import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-client-purchase-service',
  templateUrl: './client-purchase-service.component.html',
  styleUrls: ['./client-purchase-service.component.scss']
})
export class ClientPurchaseServiceComponent implements OnInit {

  public loading : boolean = false;
  public search_text: any;

  constructor() { }

  ngOnInit(): void {
    this.serviceList();
  }

  serviceList(){

  }
}
