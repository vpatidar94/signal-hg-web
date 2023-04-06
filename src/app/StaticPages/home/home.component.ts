import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public baseUrl = this.commonservice.baseUrl;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    //autoplay:true,
    navSpeed: 200,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      }   },
  //  nav: true
  }

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { }

  ngOnInit() {
    localStorage.removeItem('sw_loginDetail');
    localStorage.removeItem('sw_CartValues');
    localStorage.removeItem('sw_DetailId');
  }

}

