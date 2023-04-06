import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

   constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
}

  ngOnInit(): void {
    window.scroll(0,0);

  }

}
