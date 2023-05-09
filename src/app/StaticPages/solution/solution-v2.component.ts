import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-solution-v2',
  templateUrl: './solution-v2.component.html',
  styleUrls: ['./solution-v2.component.scss']
})
export class SolutionV2Component implements OnInit {

  public baseUrl = this.commonservice.baseUrl;

   constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  }

  ngOnInit(): void {
    window.scroll(0,0);
  }

}
