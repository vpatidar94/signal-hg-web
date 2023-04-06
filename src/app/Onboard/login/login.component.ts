import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public baseUrl = this.commonservice.baseUrl;

   constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
}

  ngOnInit(): void {
  }

}
