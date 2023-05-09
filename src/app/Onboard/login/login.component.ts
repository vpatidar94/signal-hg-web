import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DataService } from '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public baseUrl = this.commonservice.baseUrl;
  role: any = 'FRANCHISE';
  signUpUrl: any = `${this.baseUrl}studioadmin/home`;
  loginUrl: any = `${this.baseUrl}studioadmin/login`;
  isRoute = false;

  constructor(private route: Router, private activeRoute: ActivatedRoute, public commonservice: DataService) {
  }

  ngOnInit(): void {
  }

  getGender(event: any) {
    this.role = event.target.value;
    switch (this.role) {
      case 'FRANCHISE':
        this.signUpUrl = new URL(`${this.baseUrl}studioadmin/home`).href;
        this.loginUrl = new URL(`${this.baseUrl}studioadmin/login`).href;
        this.isRoute = false;
        break;
      case 'INSTRUCTOR':
        this.signUpUrl = `/staff-registration`;
        this.loginUrl = `/staff-signin`;
        this.isRoute = true;
        break;
      case 'CUSTOMER':
        this.signUpUrl = `/registration`;
        this.loginUrl = `/signin`;
        this.isRoute = true;
        break;
    }
  }

}
