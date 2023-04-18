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

  slides = [
    { img: "http://placehold.it/350x150/000000" },
    { img: "http://placehold.it/350x150/111111" },
    { img: "http://placehold.it/350x150/333333" },
    { img: "http://placehold.it/350x150/666666" }
  ];
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 1500
}

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}

