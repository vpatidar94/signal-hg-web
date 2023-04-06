import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras, NavigationEnd, ActivatedRoute } from "@angular/router";  
import { DataService } from  '../../Services/data.service';
declare var $;

@Component({
  selector: 'app-my-schdule-appointment-detail',
  templateUrl: './my-schdule-appointment-detail.component.html',
  styleUrls: ['./my-schdule-appointment-detail.component.scss']
})
export class MySchduleAppointmentDetailComponent implements OnInit {

  public businessDetail : any =[];
  public loading : boolean = true;
  public serviceList : any = [] ;

  constructor(private route: Router,  private activeRoute: ActivatedRoute,  public commonservice: DataService) { 
    this.businessDetail = JSON.parse(localStorage.getItem('sw_BusinessDetail'));
    this.serviceList = JSON.parse(localStorage.getItem('sw_scduledeteail'));
  }
 
  ngOnInit(): void {
  }

  changeSelection(){
    
  }
}
