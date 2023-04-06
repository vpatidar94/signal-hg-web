import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
  }

  ngOnInit() {
    var url =window.location.pathname;
    if(url == "/"){
    this.route.navigate(['/Home']);
      //   $(this).find('.lefttabs_box').addClass('active');
      //   $(this).closest('li').prevAll().find('.active').removeClass('active');
      //   $(this).closest('li').nextAll().find('.active').removeClass('active');
      // });
      //$('.nav-item > a[href="/Home"]').addClass('active');
    //}
    // else{
    //   $('.nav-item > a[href="/"]').removeClass('active');
    }
  }

}
