import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit {

  public baseUrl = this.commonservice.baseUrl;

   constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  }

  ngOnInit(): void {
    window.scroll(0,0);
  }

}
