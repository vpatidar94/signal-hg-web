import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-inner-footer',
  templateUrl: './inner-footer.component.html',
  styleUrls: ['./inner-footer.component.scss']
})
export class InnerFooterComponent implements OnInit {

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  }

  ngOnInit(): void {
  }

}
